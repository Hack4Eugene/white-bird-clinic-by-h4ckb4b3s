# White Bird Clinic
### by
```                                  
                                                                            bbbbbbbb                             bbbbbbbb                                                
hhhhhhh                    444444444                      kkkkkkkk          b::::::b                   444444444 b::::::b             333333333333333                    
h:::::h                   4::::::::4                      k::::::k          b::::::b                  4::::::::4 b::::::b            3:::::::::::::::33                  
h:::::h                  4:::::::::4                      k::::::k          b::::::b                 4:::::::::4 b::::::b            3::::::33333::::::3                 
h:::::h                 4::::44::::4                      k::::::k           b:::::b                4::::44::::4  b:::::b            3333333     3:::::3                 
 h::::h hhhhh          4::::4 4::::4      cccccccccccccccc k:::::k    kkkkkkkb:::::bbbbbbbbb       4::::4 4::::4  b:::::bbbbbbbbb                3:::::3    ssssssssss   
 h::::hh:::::hhh      4::::4  4::::4    cc:::::::::::::::c k:::::k   k:::::k b::::::::::::::bb    4::::4  4::::4  b::::::::::::::bb              3:::::3  ss::::::::::s  
 h::::::::::::::hh   4::::4   4::::4   c:::::::::::::::::c k:::::k  k:::::k  b::::::::::::::::b  4::::4   4::::4  b::::::::::::::::b     33333333:::::3 ss:::::::::::::s 
 h:::::::hhh::::::h 4::::444444::::444c:::::::cccccc:::::c k:::::k k:::::k   b:::::bbbbb:::::::b4::::444444::::444b:::::bbbbb:::::::b    3:::::::::::3  s::::::ssss:::::s
 h::::::h   h::::::h4::::::::::::::::4c::::::c     ccccccc k::::::k:::::k    b:::::b    b::::::b4::::::::::::::::4b:::::b    b::::::b    33333333:::::3  s:::::s  ssssss 
 h:::::h     h:::::h4444444444:::::444c:::::c              k:::::::::::k     b:::::b     b:::::b4444444444:::::444b:::::b     b:::::b            3:::::3   s::::::s      
 h:::::h     h:::::h          4::::4  c:::::c              k:::::::::::k     b:::::b     b:::::b          4::::4  b:::::b     b:::::b            3:::::3      s::::::s   
 h:::::h     h:::::h          4::::4  c::::::c     ccccccc k::::::k:::::k    b:::::b     b:::::b          4::::4  b:::::b     b:::::b            3:::::3ssssss   s:::::s 
 h:::::h     h:::::h          4::::4  c:::::::cccccc:::::ck::::::k k:::::k   b:::::bbbbbb::::::b          4::::4  b:::::bbbbbb::::::b3333333     3:::::3s:::::ssss::::::s
 h:::::h     h:::::h        44::::::44 c:::::::::::::::::ck::::::k  k:::::k  b::::::::::::::::b         44::::::44b::::::::::::::::b 3::::::33333::::::3s::::::::::::::s 
 h:::::h     h:::::h        4::::::::4  cc:::::::::::::::ck::::::k   k:::::k b:::::::::::::::b          4::::::::4b:::::::::::::::b  3:::::::::::::::33  s:::::::::::ss  
 hhhhhhh     hhhhhhh        4444444444    cccccccccccccccckkkkkkkk    kkkkkkkbbbbbbbbbbbbbbbb           4444444444bbbbbbbbbbbbbbbb    333333333333333     sssssssssss    
```
White Bird project by h4ckb4b3s

# IMPORTANT - Authentication
The server will not function if the `SESSION_SECRET` envar is not set. When starting the server be sure to run the equivalent of the following command:
```
export SESSION_SECRET="<SECRET PASS PHRASE>"
```
The passphrase can be whatever you want - it's used as a salt, so there is no need to remember it

## Contributing
git clone the repo

cd into the newly cloned directory 

	$ make install
	$ make start

Navigate to your web browser and type in localhost:3001

## Environment Variables
### Process
- PORT
	- Port to use for the server. Default is 3001

- DB_CONNECTION
	- Connection string for connecting to the mongodb

- SESSION_SECRET
	- `secret` used for session auth

## Utilities
Utilites live in the [utils](utils) directory. They are helper processes that are generally designed for development purposes

### Render Scss
This utility will automatically find `.scss` files in the [public/stylesheets](public/stylesheets) directory and convert those files into `.css`. This utility is automatically run when using `make start`, but it can be run seperatly by running `make scss`

### Seed
This utility will "seed" a local mongo database with data from a hard-coded csv file. This can be run with `make seed`, and should only need to be run when there are updates to the data csv

## JSON REST API
This project also includes a fully featured REST API for programatic access to the Help Book data

## Windows Development
Good luck!

Make seems to be unhappy with Windows environments. If Make commands aren't working, try running the commands (or Windows equivalent commands) that are in the [Makefile](Makefile) itself
