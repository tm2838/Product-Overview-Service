mongoimport --type csv -d test -c base_products --headerline --drop productData/product.csv

mongoimport --type csv -d test -c features --headerline --drop productData/features.csv

mongoimport --type csv -d test -c init_styles --headerline --drop productData/styles.csv

mongoimport --type csv -d test -c photos --headerline --drop productData/photos.csv

mongoimport --type csv -d test -c skus --headerline --drop productData/skus.csv

mongo < .scripts/transformData.sh
