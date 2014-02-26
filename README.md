# DozerJS MySQL Adapter

This is a simple MySQL adapter that follows the conventions of the default
NeDB adapter. It has been developed to allow for mocking and development with
the NeDB adapter, then seamless transition to a MySQL adapter by utilizing the
same set of methods in both.

The adapter uses [node-mysql](https://github.com/felixge/node-mysql) for
interaction with the database.

## Setup

You can install this adapter via the [dozerjs cli-tool](https://www.npmjs.org/package/dozerjs) by
running:

```
dozerjs install https://github.com/daseinhorn/dz-mysql-adapter.git
```

After installing this adapter extension edit your `/config.js` file with the
following structure:

```javascript
  // Database store configuration
  db: {

    // Specify adapter to use
    adapter: 'mysql',

    // Adapter specific configuration
    config: {
      host: "localhost",
      database: "database_name",
      user: "username",
      pass: "password"
    }

  }
```

## Demo/Examples

While the `dozer.json` specifies only the installation of the adapter, the
scaffolding includes an example `api`, `model` and `controller` file.