require 'rubygems'
require 'bundler/setup'
require 'pathname'

NODE_PATH = Pathname.new('vendor/node_modules').expand_path
def node_package(name)
  (NODE_PATH + name).to_s
end

def get_path(package, subpath)
  (NODE_PATH + package + subpath).to_s
end

def spawn(path, args, success, failure)
  require "spoon"

  name = File.basename(path)
  pid_file = "tmp/pids/#{name}.pid"
  log_file = "tmp/logs/#{name}.log"
  if !File.exist?(pid_file)
    FileUtils.rm(log_file)

    file_actions = Spoon::FileActions.new
    file_actions.close(1)
    file_actions.open(1, log_file, File::WRONLY | File::TRUNC | File::CREAT, 0600)
    file_actions.close(2)
    file_actions.open(2, log_file, File::WRONLY | File::APPEND, 0600)
    spawn_attr = Spoon::SpawnAttributes.new
    pid = Spoon.posix_spawn(path, file_actions, spawn_attr, args.unshift(name))

    error = "timed out"
    5.times do
      begin
        data = File.read(log_file)
        if data =~ success
          error = nil
          break
        elsif data =~ failure
          error = data
          break
        end
      rescue Errno::ENOENT
      end
      sleep 1
    end

    if error.nil?
      File.open(pid_file, "w") { |f| f.print(pid) }
    else
      raise "Couldn't start #{path}: #{error}"
    end
  end
end

def kill(name)
  require "fileutils"

  pid_file = "tmp/pids/#{name}.pid"
  if File.exist?(pid_file)
    pid = File.read(pid_file).to_i
    begin
      Process.kill("TERM", pid)
      FileUtils.rm(pid_file)
    end
  end
end

def compile_template(infile, outfile)
  File.open(outfile, 'w') do |outf|
    outf.puts("// autogenerated from #{infile} at #{Time.now}")
    outf.puts("define(function() {")
    outf.puts("  var m = {};")
    outf.puts("  m.source =")
    lines = IO.readlines(infile)
    lines.push("") if lines.empty?
    strings = lines.collect! { |l| l.inspect }
    outf.puts("    " + lines.join(" +\n    ") + ";")
    outf.puts("  return m;")
    outf.puts("});")
  end
end

%w{buster buster-amd phantomjs requirejs}.each do |lib|
  directory node_package(lib) do
    `cd vendor && npm install #{lib}`
  end
end

desc "Run test suite"
task :test => ['phantomjs:start', 'test:buster']

task :default => :test

namespace :test do
  task :buster => ['buster:start', 'templates:build'] do
    buster_test = get_path('buster', 'bin/buster-test')
    ENV['NODE_PATH'] = 'vendor/node_modules'
    system(buster_test)
  end

  desc "Restart servers and run test suite"
  task :restart => ['phantomjs:restart', :test]

  desc "Run manual test"
  task :manual => 'test:buster'
end

namespace :buster do
  desc "Start buster server"
  task :start => node_package('buster') do
    path = get_path("buster", "bin/buster-server")
    Rake::Task[path].invoke
    spawn(path, [], /running/, /in use/)
  end

  desc "Stop buster server"
  task :stop => 'phantomjs:stop' do
    kill("buster-server")
  end
end

namespace :phantomjs do
  desc "Start phantomjs"
  task :start => ['buster:start', node_package('phantomjs')] do
    path = get_path('phantomjs', 'bin/phantomjs')
    Rake::Task[path].invoke
    script = get_path("buster", "script/phantom.js")
    spawn(path, [script], /success/, /fail/)
  end

  desc "Stop phantomjs"
  task :stop do
    kill('phantomjs')
  end

  desc "Restart phantomjs"
  task :restart => ['buster:stop', :start]
end

desc "Kill all node processes and remove PID files"
task :killall do
  system('killall node')
  FileUtils.rm(Dir.glob('tmp/pids/*.pid'), :verbose => true)
end

namespace :templates do
  desc "Build templates"
  task :build do
    templates = FileList["src/templates/*.html"].
      sub!(%r{(templates/.+?)\.html$}, 'js/\1.js')
    templates.each do |template|
      Rake::Task[template].invoke
    end
  end

  desc "Clean up non-existant templates"
  task :clean do
    valid = FileList["src/templates/*.html"].
      sub!(%r{(templates/.+?)\.html$}, 'js/\1.js')
    invalid = FileList["src/js/templates/*.js"] - valid
    if !invalid.empty?
      FileUtils.rm(invalid, :verbose => true)
    end
  end

  rule %r{src/js/templates/(.+?)\.js} => [proc { |n| n.sub(%r{js/(templates/.+?)\.js}, '\1.html') }] do |t|
    compile_template(t.source, t.name)
  end
end

desc "Build application for optimized viewing"
task :build => ['templates:build', node_package('requirejs')] do
  rjs = get_path('requirejs', 'bin/r.js')
  system(rjs, "-o", "build.js")
end
