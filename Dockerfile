FROM node:8.4

ENV PORT=3000
#Discord
ENV PAYMENTIQ_API_URL=https://test-api.paymentiq.io/paymentiq/api

#JWT
ENV JWT_SECRET=fl3xThos3Muscl3sH3Said

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]