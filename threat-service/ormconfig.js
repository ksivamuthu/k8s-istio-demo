module.exports = {
    "type": "mysql",
    "host": "mysql",
    "port": 3306,
    "username": "root",
    "password": "password",
    "entities": ["dist/**/**.model{.ts,.js}"],
    "database": "k8s-istio",
    "synchronize": true
}