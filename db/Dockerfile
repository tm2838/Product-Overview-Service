FROM mongo

COPY fixtures fixtures
COPY load.sh .

EXPOSE 27017

CMD ["sh", "load.sh"]
# CMD ["mongoimport", "--type", "csv", "-d", "test", "-c", "base_products", "--headerline", "--drop", "fixtures/prodcut.csv"]
