## Spark Webdialer
#### by Aman Chhabra [Github](https://github.com/achhabra2/webdialer)
---
#### Updates
Couple of updates on the webdialer: 

You can create a simple branded video page with just a URL of your banner to display above the video panel. Find the banner of your choice (easiest to go to images.google.com and search). Then put it in this URL: 

https://webdialer.chhab.rocks/brand?banner=**YOUR URL**

You will be prompted to log in to your Spark account and… voila you will have your very own custom-branded Spark video page. 

Another one is really cool: 

Create your own custom calling links by prepopulating the SIP or Spark video address as well as setting the option to immediately start the call. 

Use this URL: 

https://webdialer.chhab.rocks/call?

And use uri=**YOUR SIP ADDRESS**
And use immediate=``true`` or ``false``

So for example a full URL would be: 
``https://webdialer.chhab.rocks/call?uri=roomkit@sparkdemos.com&immediate=true``

This URL once the user authenticates will immediately start a call to ``roomkit@sparkdemos.com``. 

#### About
The Webdialer app is a Cisco Spark Video Client that is embedded into a web browser. Through the use of the [Spark JS SDK](https://developer.ciscospark.com/sdk-for-nodejs.html) and WebRTC in both Chrome and Firefox you are able to make either a Spark Video Call, or a standards based SIP Video Call. Additionally it allows you to overlay Cisco Spark Video on top of any website or branding URL you provide. 
***
#### Capabilities
1. Make Spark or SIP Video Call, with Full Screen, Mute Audio, Mute Video. 
2. Enter branding URL and overlay Spark Video on top of any existing website (Demo purposes only). The overlay option gives you the ability to have a draggable Mayday button as well. Please see the notes in Usage. 
***
#### Usage
The site is available at [here](https://webdialer.chhab.rocks). You will need to authorize an existing Cisco Spark account for it to work properly. From there you can go to either the ``Call`` tab or the ``Custom Page`` tab. The ``Call`` tab allows you to place a Spark call or a SIP Video Call. The ``Custom Page`` tab allows you to enter a branding URL to simulate video on a customer's webpage. 

**IMPORTANT**: When you load a branding page it will take a minute or so, please be patient. Also if you choose the Mayday option - there is a drag handle to the left. Do not try to drag the Mayday button as you will end up making a call instead. Lastly - the Mayday button and video containers are separate elements, you must drag them around independently. 

**Note**: This will require the ``Spark All`` permissions on your Cisco Spark account. This is because any embedded video client requires these full access permissions. 

***
#### Privacy
Your data is not stored or captured in any way. There are no persistent sessions - so you must authenticate the app every time you use it. No data is stored server side, this is purely a browser client use case. 
