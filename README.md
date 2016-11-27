# pkg-helper
Package helper for npm

##Using

```
npm install pkg-helper
```

##Documentation

### `findPackage(packageName, packageList)`
Returns if **packageName** is on **packageList**.

### `getPackages(packagesPath)`
Returns a **packageList** array containing **{packageName, version, packagePath}** for each package found on **packagesPath**.
