1. Implementation:
    a. displayed 6 vehicles based on their locations using the car icon
    b. 3 files were created: index.html, map.js, and style.css

2.  I worked on this lab my own, but researched information over the webs.  

3. I spent 4-5 hours.

4. Pre-Optimization Info:
    index.html: 6 ms, 269 B
    map.js: 34 ms, 1.4kB
    style.css: 36 ms, 90B
    API key: 151 ms, 54.5 kB
    gen_204?csp_test = true: 52 ms, 45 B
    common.js  86 ms, 69.6 kB
    util.js: 83 ms, 62 kB
    map.js: 67 ms, 25.8 kB
    marker.js: 30 ms, 13.5 kB
    infowindow.js: 18 ms, 31.1 kb

5. Post Optimization Info:
    index.html: 3 ms, 269 B
    map.js: 41 ms, 926 B
    style.css: 39 ms, 65B
    API key: 122 ms, 54.5 kB
    gen_204?csp_test = true: 58 ms, 45 B
    common.js  87 ms, 69.6 kB
    util.js: 84 ms, 62 kB
    map.js: 62 ms, 25.8 kB
    marker.js: 25 ms, 13.5 kB
    infowindow.js: 23 ms, 31.1 kB

6.  Observations:
     - It is interesting to see the sizes and times for not only the overall files (index, map, css), 
       but also the break-out of my js codes and Google Map API js codes.  
    
     - The sizes of the js and css files are smallers after minifying, but the times did not always decrease; 
       not sure if it is related to my home network or not

     - Overall, there is a bit of improvement   







