# Broken Access Control: Example Application

This repository contains code of an example application, which attempts to demonstrate vulnerabilities related to broken access control. Especially the code in the backend directory is relevant, since all of the security is implemented on the server.

This repository offers three branches, with different versions of the same code.
The main branch consists of the vulnerable version.
The safe branch fixes the two main access control vulnerabilities.
The safe2 branch goes a step further and tries to implement some of the good practices related to access control.
Check the READMEs in the other branches for more information on the specific fixes.

A database configuration file is missing currently, so to run it
one would need to configure a database connection manually, which we unfortunately could not provide.
The code - especially in the backend - can still be studied and the branches represent different security levels, with main being the most insecure one.
