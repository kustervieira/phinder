OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['380411611996628'], ENV['c410e0d62c67a2f5f8a853ef63f5abca']
end