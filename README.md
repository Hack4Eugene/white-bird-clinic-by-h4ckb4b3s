```                                                                                                       
WWWWWWWW                           WWWWWWWWhhhhhhh               iiii          tttt                              
W::::::W                           W::::::Wh:::::h              i::::i      ttt:::t                              
W::::::W                           W::::::Wh:::::h               iiii       t:::::t                              
W::::::W                           W::::::Wh:::::h                          t:::::t                              
 W:::::W           WWWWW           W:::::W  h::::h hhhhh       iiiiiiittttttt:::::ttttttt        eeeeeeeeeeee    
  W:::::W         W:::::W         W:::::W   h::::hh:::::hhh    i:::::it:::::::::::::::::t      ee::::::::::::ee  
   W:::::W       W:::::::W       W:::::W    h::::::::::::::hh   i::::it:::::::::::::::::t     e::::::eeeee:::::ee
    W:::::W     W:::::::::W     W:::::W     h:::::::hhh::::::h  i::::itttttt:::::::tttttt    e::::::e     e:::::e
     W:::::W   W:::::W:::::W   W:::::W      h::::::h   h::::::h i::::i      t:::::t          e:::::::eeeee::::::e
      W:::::W W:::::W W:::::W W:::::W       h:::::h     h:::::h i::::i      t:::::t          e:::::::::::::::::e 
       W:::::W:::::W   W:::::W:::::W        h:::::h     h:::::h i::::i      t:::::t          e::::::eeeeeeeeeee  
        W:::::::::W     W:::::::::W         h:::::h     h:::::h i::::i      t:::::t    tttttte:::::::e           
         W:::::::W       W:::::::W          h:::::h     h:::::hi::::::i     t::::::tttt:::::te::::::::e          
          W:::::W         W:::::W           h:::::h     h:::::hi::::::i     tt::::::::::::::t e::::::::eeeeeeee  
           W:::W           W:::W            h:::::h     h:::::hi::::::i       tt:::::::::::tt  ee:::::::::::::e  
            WWW             WWW             hhhhhhh     hhhhhhhiiiiiiii         ttttttttttt      eeeeeeeeeeeeee          
                                                                   
                                                           dddddddd
BBBBBBBBBBBBBBBBB     iiii                                 d::::::d
B::::::::::::::::B   i::::i                                d::::::d
B::::::BBBBBB:::::B   iiii                                 d::::::d
BB:::::B     B:::::B                                       d:::::d 
  B::::B     B:::::Biiiiiiirrrrr   rrrrrrrrr       ddddddddd:::::d 
  B::::B     B:::::Bi:::::ir::::rrr:::::::::r    dd::::::::::::::d 
  B::::BBBBBB:::::B  i::::ir:::::::::::::::::r  d::::::::::::::::d 
  B:::::::::::::BB   i::::irr::::::rrrrr::::::rd:::::::ddddd:::::d 
  B::::BBBBBB:::::B  i::::i r:::::r     r:::::rd::::::d    d:::::d 
  B::::B     B:::::B i::::i r:::::r     rrrrrrrd:::::d     d:::::d 
  B::::B     B:::::B i::::i r:::::r            d:::::d     d:::::d 
  B::::B     B:::::B i::::i r:::::r            d:::::d     d:::::d 
BB:::::BBBBBB::::::Bi::::::ir:::::r            d::::::ddddd::::::dd
B:::::::::::::::::B i::::::ir:::::r             d:::::::::::::::::d
B::::::::::::::::B  i::::::ir:::::r              d:::::::::ddd::::d
BBBBBBBBBBBBBBBBB   iiiiiiiirrrrrrr               ddddddddd   ddddd
                                                                                               
                                                                                               
        CCCCCCCCCCCCC                                                                          
     CCC::::::::::::C                                                                          
   CC:::::::::::::::C                                                                          
  C:::::CCCCCCCC::::C                                                                          
 C:::::C       CCCCCC  aaaaaaaaaaaaa  rrrrr   rrrrrrrrr       eeeeeeeeeeee        ssssssssss   
C:::::C                a::::::::::::a r::::rrr:::::::::r    ee::::::::::::ee    ss::::::::::s  
C:::::C                aaaaaaaaa:::::ar:::::::::::::::::r  e::::::eeeee:::::eess:::::::::::::s 
C:::::C                         a::::arr::::::rrrrr::::::re::::::e     e:::::es::::::ssss:::::s
C:::::C                  aaaaaaa:::::a r:::::r     r:::::re:::::::eeeee::::::e s:::::s  ssssss 
C:::::C                aa::::::::::::a r:::::r     rrrrrrre:::::::::::::::::e    s::::::s      
C:::::C               a::::aaaa::::::a r:::::r            e::::::eeeeeeeeeee        s::::::s   
 C:::::C       CCCCCCa::::a    a:::::a r:::::r            e:::::::e           ssssss   s:::::s 
  C:::::CCCCCCCC::::Ca::::a    a:::::a r:::::r            e::::::::e          s:::::ssss::::::s
   CC:::::::::::::::Ca:::::aaaa::::::a r:::::r             e::::::::eeeeeeee  s::::::::::::::s 
     CCC::::::::::::C a::::::::::aa:::ar:::::r              ee:::::::::::::e   s:::::::::::ss  
        CCCCCCCCCCCCC  aaaaaaaaaa  aaaarrrrrrr                eeeeeeeeeeeeee    sssssssssss                                                                                                                                                                                                                                                                            
```
# White Bird Challeng project by h4ckb4b3s

## IMPORTANT - Authentication
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

### Combine Data
One time utility used to collate data - no longer useful, but has sentimental value

## JSON REST API
This project also includes a partially featured REST API for programatic access to the Help Book data. Data can only be retireved, not altered

## Windows Development
Good luck!

Make seems to be unhappy with Windows environments. If Make commands aren't working, try running the commands (or Windows equivalent commands) that are in the [Makefile](Makefile) itself

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
