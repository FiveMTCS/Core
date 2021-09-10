# Basic modules

## Database

TCS uses its own multi-database wrapper. In other words, your script, with the exact same lines of code, will work with both mysql and mongodb databases.

> We really think users of the scripts should be able to choose the database they want to use. That's why we made that.

The current wrapper handles by itself the creation of the tables and columns for mysql, and the collections from mongodb.

### Getting started

#### Setting up config

- Go to `tcs/assets/srv_databaseConfig.js` and select if you want to use mysql or mongodb.

#### Scripting with the wrapper

Here is an example of what you can do with the wrapper and how you should use it :

    TCS.database?.onDatabaseReady(async () => {
        // Now connected to the database
        const  db = TCS.database?.database();

        if (db) {
    	    // Ensure the table test and the specified columns are created... No need for an sql 			file to be imported for each module !
    	    await  db.ensureColumns('test', [
    		    {
    			   column:  'column1',
    			   type:  sqlTypes.VARCHAR,
    			},
    		    {
    			   column:  'active',
    			   type:  sqlTypes.INT,
    			},
    	    ]);

    	    // Insert the specified data in 'test' table / collection
    	    await  db.insert('test', {
    			column1:  'test',
    			active:  1,
    		});

    	    // Get all data where active is equal to 1
    	    console.log(
    		    await  db
    			    .get(['test'], {
    				    active:  1,
    			    })
    			    .execute(),
    		);

    	    // Set all data where active is equal to 1 to 0
    	    await  db.update(
    			'test',
    			{
    				active:  1,
    			},
    			{
    				active:  0,
    			},
    		);


    	    // Get one data where active is equal to 0
    	    console.log(
    		    await  db
    			    .get(['test'], {
    				    active:  0,
    			    })
    			    .executeOne(),
    	    );

    	    // Delete all data where active is equal to 0
    	    await  db.delete('test', {
    		    active:  0,
    	    });

    	    // Returns null as no more data has active equal to 0
    	    console.log(
    		    await  db
    			    .get(['test'], {
    				    active:  0,
    				})
    		    .executeOne(),
    	    );
        }

       });
