/*****************************************************
 * TP MongoDB – Commandes & Requêtes
 * Base : BankDB
 * Collection : transactions
 *****************************************************/

/* Sélection de la base */
use BankDB

/* Vérifier les collections */
show collections

/* Vérifier le nombre de documents */
db.transactions.countDocuments({})

/* Afficher quelques transactions */
db.transactions.find().limit(5)

/* Supprimer un utilisateur (exemple) */
db.users.deleteOne({ name: "Charlie" })

/* Supprimer une collection */
db.users.drop()

/* Nombre de transactions par statut */
db.transactions.aggregate([
  {
    $group: {
      _id: "$Transaction Status",
      total: { $count: {} }
    }
  }
])

/* Top 5 comptes expéditeurs par montant total */
db.transactions.aggregate([
  {
    $group: {
      _id: "$Sender Account ID",
      totalSent: { $sum: { $toDouble: "$Transaction Amount" } }
    }
  },
  { $sort: { totalSent: -1 } },
  { $limit: 5 }
])

/* Montant total par type de transaction */
db.transactions.aggregate([
  {
    $group: {
      _id: "$Transaction Type",
      totalAmount: { $sum: { $toDouble: "$Transaction Amount" } }
    }
  }
])
