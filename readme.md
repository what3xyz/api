# What3.xyz

What3 will allow a user to post their three ideas a day: x, y and z!

They will find inspiration and inspire others. We will foster a community of makers.

The idea is inspired by an [article](https://jamesaltucher.com/2014/05/the-ultimate-guide-for-becoming-an-idea-machine/) we read. Even though everyone might not be an idea machine producing new 10 ideas a day, we think anyone can come up with just 3 (x, y, z).

## What3.xyz API

Simple Express.js API to store and retrieve ideas from the database.

### Clients
API will be consumed by our website, iOS and Android devices. We will look into opening up the API to 3rd parties once stable. Email us if you have any ideas!

### Authentication
We will use JWT (JSON Web Tokens) for the API.

### Database
Using a PostgreSQL database (_or CockroachDB_). Using the `pg` NodeJS Postgres DB Driver.

### Endpoints
* /auth 
    * post - login user
    * post - create a new user (will use gravatar for avatars at first)
* /users/[:userId]
    * get - get an user account
    * put - update an user account
* /ideas
    * post - add a new idea
        * validate (140 char or less, etc.)
    * get - get all ideas
        * limit 20, order by date DESC
* /ideas/[:ideaId]
    * get - return single specific idea
    * put - update an idea
        * verify owned by the user
* /ideas/user/[:userId]
    * get - ideas from a specific user
* /tags
    * get - return all ideas under tag
        * limit 20, order by date DESC

### Later 
* /auth
    * refresh jwt token
    * reset or forgot password
    * maybe anonymous users
* /users
    * post - upload and compress images for avatars
* /devices
    * post - save device push notification id's

### Principles
* Simple, fun, obvious design
    - short 140 characters only for each post (tweetable!)
    - able to follow other users @jaltucher
    - notifications when your favorite people post new ideas
    - #hashtags for tags of an idea (limited amount)

