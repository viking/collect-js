require 'rubygems'
require 'bundler/setup'
require 'pathname'

NODE_PATH = Pathname.new('vendor/node_modules').expand_path
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
      data = File.read(log_file)
      if data =~ success
        error = nil
        break
      elsif data =~ failure
        error = data
        break
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

file get_path('buster', 'bin/buster-server') do
  `cd vendor && npm install buster`
end

file get_path('phantomjs', 'bin/phantomjs') do
  `cd vendor && npm install phantomjs`
end

desc "Run test suite"
task :test => 'phantomjs:start' do
  buster_test = get_path('buster', 'bin/buster-test')
  ENV['NODE_PATH'] = 'vendor/node_modules'
  system(buster_test)
end
task :default => :test

namespace :test do
  desc "Restart servers and run test suite"
  task :restart => ['phantomjs:restart', :test]
end

namespace :buster do
  desc "Start buster server"
  task :start do
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
  task :start => 'buster:start' do
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
