## Spark Webdialer
#### by Aman Chhabra
---
#### About
The Webdialer app is a Cisco Spark Video Client that is embedded into a web browser. Through the use of the [Spark JS SDK](https://developer.ciscospark.com/sdk-for-nodejs.html) and WebRTC in both Chrome and Firefox you are able to make either a Spark Video Call, or a standards based SIP Video Call. Additionally it allows you to overlay Cisco Spark Video on top of any website or branding URL you provide. 
***
#### Capabilities
1. Make Spark or SIP Video Call, with Full Screen, Mute Audio, Mute Video. 
2. Enter branding URL and overlay Spark Video on top of any existing website (Demo purposes only). 
***
#### Usage
The site is available at [here](https://webdialer.chhab.rocks). You will need to authorize an existing Cisco Spark account for it to work properly. From there you can go to either the ``Call`` tab or the ``Custom Page`` tab. The ``Call`` tab allows you to place a Spark call or a SIP Video Call. The ``Custom Page`` tab allows you to enter a branding URL to simulate video on a customer's webpage. 

**Note**: This will require the ``Spark All`` permissions on your Cisco Spark account. This is because any embedded video client requires these full access permissions. 

***
#### Privacy
Your data is not stored or captured in any way. There are no persistent sessions - so you must authenticate the app every time you use it. No data is stored server side, this is purely a browser client use case. 
