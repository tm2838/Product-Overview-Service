FROM node:16

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

# RUN mongoimport --type csv -d test -c base_products --headerline --drop db/fixtures/product.csv
# RUN mongoimport --type csv -d test -c base_features --headerline --drop db/fixtures/features.csv
# RUN mongoimport --type csv -d test -c init_styles --headerline --drop db/fixtures/styles.csv
# RUN mongoimport --type csv -d test -c base_photos --headerline --drop db/fixtures/photos.csv
# RUN mongoimport --type csv -d test -c skus --headerline --drop db/fixtures/skus.csv

EXPOSE 5000

CMD ["npm", "start"]