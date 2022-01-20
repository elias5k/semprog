# Broken Access Control: Example Application

This repository contains code of an example application, which attempts to demonstrate vulnerabilities related to broken access control. Especially the code in the backend directory is relevant, since all of the security is implemented on the server.

In its current state (17.01.2022), only the vulnerable code has been finished, which can be found on the branch "main".
One or two more branches will be added to this repository, which will attempt to fix the vulnerabilities. Also, a few configuration files are missing currently, so to run it
one would need to configure a database connection manually. It's planned to add all of the configuration by default, with a connection to aa remote database,
so anyone could clone the code and run it locally without needing to configure a local database. Alternatively, the application could be deployed remotely, but this would


A list of required installations and a walk-through will be provided, in an attempt to make the setup easier.
