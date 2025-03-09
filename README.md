# FlyManager
Test assignment project for CGI


## My progress:

### First day (4-5 hours): 
I planed how I will do the project and looked up some API, that I can use (4-5 hours).

### On Second day(maybe took 5-6 hours, maybe less I don't remember):
I found Aviasales API, get key and start looking how this API work. 
This is Api documentation link: https://support.travelpayouts.com/hc/en-us/articles/203956163-Aviasales-Data-API
Also made repository on Github and start developing Api by using Spring and Aviasales API.
#### For Http Requests decided to use HttpClient:
Here I found more info about that https://www.baeldung.com/java-9-http-client,
it was quite similar how I used it in .Net.

### On Third Day(definitely took 5 to 6 hours):
I start testing and unfortunately HTTPClient doesn't worked as planed, but I found another way
by using WEBClient
https://docs.spring.io/spring-framework/reference/web/webflux-webclient.html
#### For front I decided to use React+Vite: 
Because I already used it in the past and for this time one new framework is enough.

### On fourth day:
I had problem with request (request was forbidden) to Api, because CORS policy, but I solve it after little research
Now I have problem on client side of the project, this is Bad Request error.

### On fifth day:
I solve problems with data in front side, but I realized, that this request is quite not suit for this assignment.
Because Aviasales Api /places_for_dates request gives only flight data for next 48 hours.

I have a idea to use get_latest_prices request and then I can get flight info for specific period of time,
that user choose in Search component. And so I can show to user list of flights.

So if user ask flight for specific date and there is no flight, then he will get some options in same month.

### On sixth and seventh day:
This time I needed to give the user chance to search origin location and destination by himself so,
that Api also get right IATA code of this particular location and Select also must have some options from to choose.

I used cities JSON provided in Aviasales Api docs, but when I applied options to React Select, there was so many options,
that now I have problem with optimization, because React rerender page and with thousands of options page freeze and slow...

