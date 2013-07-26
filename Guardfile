ENV['GUARD_NOTIFY'] = "false"

guard 'rake', :task => 'templates:build' do
  watch(%r{^src/templates/(.+?).html$})
end

guard 'rake', :task => 'test' do
  watch(%r{^test/(?:[^/]+/)*test_\w+\.js$})
  watch(%r{^src/(?:[^/]+/)*\w+\.js$})
end

guard 'rake', :task => 'test:restart', :run_on_start => false, :run_on_all => false do
  watch("test/buster.js")
end
