### Build container

From root of repo:

```
docker build -t osc-keycloak-scripts-build:latest build/
```

### Build Jar

From root of repo:

```
docker run --rm -it -v $(pwd):/build -w /build \
osc-keycloak-scripts-build:latest  mvn clean package
```
