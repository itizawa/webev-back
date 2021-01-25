FROM node:14

RUN mkdir /ior-back

WORKDIR /ior-back
COPY . /ior-back

RUN yarn install

EXPOSE 8000
CMD sh -c "yarn build && yarn start"