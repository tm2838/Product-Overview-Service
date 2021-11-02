mongoimport --type csv -d test -c base_products --headerline --drop fixtures/product.csv

mongoimport --type csv -d test -c base_features --headerline --drop fixtures/features.csv

mongoimport --type csv -d test -c init_styles --headerline --drop fixtures/styles.csv

mongoimport --type csv -d test -c base_photos --headerline --drop fixtures/photos.csv

mongoimport --type csv -d test -c skus --headerline --drop fixtures/skus.csv