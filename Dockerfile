FROM node:14

RUN mkdir /webev-back

WORKDIR /webev-back
COPY . /webev-back

RUN yarn install

EXPOSE 8000
CMD sh -c "yarn start"