Who's Online

---

* add TINDER GIRLS.
  * find a way to scrape all their IDs. What's the API after you've wiped your data?
* Click on their picture, see a slideshow with more pictures. Would be awesome.
* Hinge makes it hard to find people. No search, no obvious dates. Make it easy to send a message?
* Database to keep track of girls I <3
  * Push the button: POST /hearts with girl's ID
  * db table: hearts, which just has a girl ID.
* Automate getting the tokens? That's hard, but enables this to go out to lots of people.
  * Currently, I have to use Charles to listen to a request that's already authenticated.
    * Go to Network, see the IP address right under "Status: Connected"
    * In iPhone wifi settings, set a manual proxy with the IP address and port 8888.
    * For Tinder, anything to api.gotinder.com, go to "Request" tab, right click and "Copy cURL request"
    * Similar for Hinge.