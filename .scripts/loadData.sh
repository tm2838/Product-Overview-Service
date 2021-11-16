mongoimport --type csv -d test -c base_products --headerline --drop productData/product.csv

mongoimport --type csv -d test -c features --headerline --drop productData/features.csv

mongoimport --type csv -d test -c init_styles --headerline --drop productData/styles.csv

mongoimport --type csv -d test -c photos --headerline --drop productData/photos.csv

mongoimport --type csv -d test -c skus --headerline --drop productData/skus.csv

mongo_user=$(grep MONGO_USER .env | cut -d '=' -f 2-)
mongo_password=$(grep MONGO_PASSWORD .env | cut -d '=' -f 2-)
mongo_url=$(grep MONGO_URL .env | cut -d '=' -f 2-)

mongo -u $mongo_user -p $mongo_password $mongo_url < .scripts/transformData.sh
