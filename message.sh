echo $@
curl -d "text=$*&recipeint=test_recipient" your_bot_url/message
