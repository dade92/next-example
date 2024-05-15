FROM mysql

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password

COPY ./1.sql /docker-entrypoint-initdb.d
COPY ./2.sql /docker-entrypoint-initdb.d