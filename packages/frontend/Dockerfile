FROM node:13

RUN git clone https://github.com/facebook/watchman.git /tmp/watchman-src -b v4.9.0 --depth 1 && \
    cd /tmp/watchman-src && \
    ./autogen.sh && \
    ./configure --enable-statedir=/tmp --without-python --without-pcre && \
    make && \
    make install && \
    rm -r /tmp/watchman-src

