# Broken Access Control: Example Application

This repository contains code of an example application, which attempts to demonstrate vulnerabilities related to broken access control. Especially the code in the backend directory is relevant, since all of the security is implemented on the server.

This repository offers three branches, with different versions of the same code.
The main branch consists of the vulnerable version.
The safe branch fixes the two main access control vulnerabilities.
The safe2 branch goes a step further and tries to implement some of the good practices related to access control.
Check the READMEs in the other branches for more information on the specific fixes.

A database configuration file is missing currently, so to run it
one would need to configure a database connection manually. It's planned to add all of the configuration by default, with a connection to aa remote database,
so anyone could clone the code and run it locally without needing to configure a local database.

A list of required installations and a walk-through will be provided, in an attempt to make the setup easier.
