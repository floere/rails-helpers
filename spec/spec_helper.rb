## Views

# In view specs you repetitively write something along the lines of
#
#   def render_view options = {}
#     render options
#   end
#
# And also repeat it in the describe
#
#   describe "path/to/view/name"
#
# Usage:
#
#   describe_view 'path/to/view/template.html.haml' do
#     
#     it "should …" do
#       
#       # here you have the handy
#       render_view
#       # available
#
#     end
#
#   end
#
def describe_view path, &block
  described = describe path, :type => :view, &block
  
  described.class_eval <<-BODY
    
    def render_view user_options = {}
      options = { :template => "#{path}" }
      options.merge! user_options if user_options
      render options
    end
    
  BODY
  
  described
end

## Translations

# Replaces the pattern
#
#   context 'en' do
#     before(:all) do
#       I18n.locale = 'en'
#     end
#     after(:all) do
#       # set it back
#     end
#     it "should be translated such and such" do
#       response.should have_tag("#bla button[value=?]", "Some Translation")
#     end
#   end
#
# Usage:
#  locale 'en' do
#    it_should_be_translated "#bla button[value=?]", "Some Translation"
#  end
#
#  Also:
#  locale 'en' do
#    it_should_not_have_missing_translations # checks for the string "missing translation"
#  end
#
def locale locale, &block
  def self.it_should_be_translated(selector, translation)
    it "#{selector} should have translation #{translation}" do
      response.should have_tag(selector, translation)
    end
  end
  def self.it_should_not_have_missing_translations
    it "should have everything translated" do
      response.should_not match(/translation missing/)
    end
  end
  
  contexted = context "with locale #{locale}", &block
  
  contexted.class_eval <<-BODY
    before(:all) do
      @old_locale = I18n.locale
      I18n.locale = locale
    end
    after(:all) do
      I18n.locale = @old_locale
    end
  BODY
end