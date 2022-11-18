# BIGGEST OBSTACLE:

> Couldn’t figure out how to utilize the hook to get the slug to be populated in the ‘slug’ column of the `pages` table.

### Points to cover

1. Understand what `Pages.create()` is doing

   1. We’re populating a row for our database
      1. i.e. we’re setting the `title` column a value of `req.body.title`, same thing for content
   2. This helps us because, we know we need a connection between the hook and the column `slug`, but how do we populate the `slug` column?

      1. With the same method with `title` and `content`, we can set `slug: 'some value'` (for now)

      ```jsx
      // in the wiki.js file
      const page = await Pages.create({
        title: req.body.title,
        content: req.body.content,
        slug: 'some value', // <- we'll add this line here so we're actually sending our table a value for the new row!
      });
      ```

      2. Now if we submit the form, we can check our database and see that the `slug` column of our new row has indeed been populated
         ```jsx
         id	title	    slug	    content	        status	       createdAt	       updatedAt
         1	Test Title	some value	Test Content	closed	Today, 11:11:26 -05	Today, 11:11:26 -05
                   //    ^^^^^^^^^^
         ```
         2. But, we can’t keep it as a random string, or else the validator will never fail
      3. Great, so how does this help us?

2. I finally realized what the line `user.password = hashedPassword;` actually meant.

   1. What they’re doing, is that they’re changing the value of `req.body.password` to now be equal to the newly created `hashedPassword`
   2. So, I thought, can’t we do the same thing?
   3. We could translate their code:

      ```jsx
      User.beforeCreate(async (user, options) => {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      });

      User.afterValidate('myHookAfter', (user, options) => {
        user.username = 'Toni';
      });
      ```

   4. Into something we can use for our code:

      ```jsx
      Posts.beforeCreate(async (post, options) => {
      	const sluggedTitle = await makeSlug(post.title);
      	post.slug = sluggedTitle;
      }

      // I didn't translate the afterValidate method bc of a reason i'll go over in a moment
      ```

   5. So, in theory, this is slugging our `req.body.title`, and we’re setting that slugged title as the value of our `slug` column value from the `wiki.js` file.
   6. So now, it should work right? We’re setting `req.body.slug` as the slugged title value, and we’re sending that over to our table to populate the column `slug` in our new row
   7. We hit one more hiccup which gets explained in this next point.

3. We were looking at the example wrong.

   1. The methods weren’t hard coded routes we HAD to take.
   2. They were simply ways to IMPLEMENT hooks

      1. Method 1 uses `Model.init({})`
      2. Method 2 uses `Model.addHook()`
      3. Method 3 can use any of the following methods

         (1)

         beforeBulkCreate(instances, options)

         beforeBulkDestroy(options)

         beforeBulkUpdate(options)

         (2)

         beforeValidate(instance, options)

         [... validation happens ...]

         (3)

         afterValidate(instance, options)

         validationFailed(instance, options, error)

         (4)

         beforeCreate(instance, options)

         beforeDestroy(instance, options)

         beforeUpdate(instance, options)

         beforeSave(instance, options)

         beforeUpsert(values, options)

         [... creation/update/destruction happens ...]

         (5)

         afterCreate(instance, options)

         afterDestroy(instance, options)

         afterUpdate(instance, options)

         afterSave(instance, options)

         afterUpsert(created, options)

         (6)

         afterBulkCreate(instances, options)

         afterBulkDestroy(options)

         afterBulkUpdate(options)

   3. This means that we didn’t HAVE to use `beforeCreate()` and `afterValidate()`, we could use any of the above methods.
   4. Now at this point, we hit the persistent `slug cannot be null` validation error
   5. This means our current `beforeCreate()` method isn’t catching the `slug` property before the validation, it’s hitting the validation and then quitting us out.
   6. So we need the hook to come in BEFORE validation
   7. We actually have a method we can use to be utilized before validation! The `beforeValidate()` method
   8. So now, our code looks like this
      ```jsx
      Pages.beforeValidate(async (page, options) => {
        const slug = await makeSlug(page.title);
        page.slug = slug;
      });
      // And we don't need that afterValidate method (they were basically showing us example 1 and example 2) we don't have to use two methods in tandem
      ```
