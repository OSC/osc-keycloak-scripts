FROM rockylinux:8
RUN dnf -y install java-21-openjdk-devel maven && yum clean all && rm -rf /var/cache/yum/*
RUN alternatives --set java $(alternatives --display java | grep 'family java-21-openjdk' | cut -d' ' -f1)
RUN alternatives --set javac $(alternatives --display javac | grep 'family java-21-openjdk' | cut -d' ' -f1)
RUN mkdir /build
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk
