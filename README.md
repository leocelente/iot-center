## IoT Center
Is a IFTTT-like system that connects via wifi boards like ESP8266.
## Running
    - Run `npm install` on both the root and client folders
    - Build the client to generate the dist folder using `npm run build`
    - Now run `docker-compose build` and check that the `web` container was built properly
    - Do a `docker-compose up` and check that you get a database connection
    - Finnaly run the `npm run dev` on the client folder to generate the front end

Note that docker commands may need to be run as root, you should add your user to the docker group to avoid using sudo all the time

After fixing most of the dependecy errors and vulnerabilities I'm definetly no longer a fan of the js ecosystem
