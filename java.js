class Compte {
    constructor(Solde=0,Nom,identifiant) {
        this.Solde=Solde;
        this.Nom=Nom;
        this.identifiant=identifiant;
    }
    AfficheSolde() {
        console.log("NOM: " + this.Nom + "\nMATRICULE: " + this.identifiant + "\nSOLDE:  " + this.Solde + "  Fcfa");
        alert("NOM: " + this.Nom + "\nIDENTIFIANT: " + this.identifiant + "\nSOLDE:  " + this.Solde + "  Fcfa");
    }
    Crediter(Montant) {
        Montant = Number(Montant);
        console.log("Vous avez éffectuée un Dépôt de " + Montant + " Fcfa");
        alert(this.Nom + " Vous avez recu un Dépôt de " + Montant + " Fcfa");
        this.Solde += Montant;
    }
    Debiter(Montant) {
        Montant = Number(Montant);
        if(Montant > this.Solde) {
            console.log("Le Solde votre compte est insuffisant pour effectuer un retrait");
            alert("Le Solde votre compte est insuffisant pour effectuer un retrait");
        } else {
            console.log("Vous avez éffectuée un Retrait de " + Montant + " Fcfa");
            alert(this.Nom + " Vous avez été debiter de " + Montant + " Fcfa");
            this.Solde -= Montant;
        }
    }
    Transferer(MontantTransferer , CompteEmetteur,CompteRecepteur) {
        if(CompteEmetteur == CompteRecepteur){
            alert("Impossible d'effectuer un transfert sur son propre compte");
        } else{
            CompteEmetteur.Debiter(MontantTransferer);
            CompteRecepteur.Crediter(MontantTransferer);
        }
    }
}
// /******************************** Creation du client ******************** */
/*class Client extends Compte {
    constructor(NomClient,MatriculeClient,CompteClient) {
        this.NomClient = NomClient;
        this.CompteClient={};
        this.MatriculeClient = MatriculeClient;
        this.CompteClient.Solde = CompteClient.Solde;
    }
    AfficherClient(){
        alert("Compte Client" + "\nNon Client: " + this.NomClient + "\nMatricule: " + this.MatriculeClient + "\nSoldeCompte: " + this.CompteClient.Solde);
    }
}
*/
let MesCompte = [];
let continuer = true;
while (continuer) {
    alert("******************************* MENU ****************************" + "\n1: Creer un Compte" + "\n2: Crediter le Compte" + "\n3: Debiter le Compte" + "\n4: Transferer dans un Compte" + "\n5: Afficher le Compte");
    let choix = prompt("Que est votre choix ");
    switch (choix) {
        case "1":
            let NonUtilisateur = prompt("Entrez votre Nom");
            let MatriculeUtilisateur = prompt("Entrez un Identifiant");
            let MontantUtilisateur = prompt("Entrez un montant initial du compte");
            for(let Compte of MesCompte){
                if(Compte.identifiant === MatriculeUtilisateur){
                    alert("Un compte d'identifant " + MatriculeUtilisateur + " existe deja" + "\nVeillez choix un autre identifiant");
                } else {
                    MesCompte.push(new Compte(MontantUtilisateur,NonUtilisateur,MatriculeUtilisateur));
                    for(let Compte of MesCompte){
                        if(Compte.identifiant === MatriculeUtilisateur){
                            Compte.AfficheSolde();
                        }
                    }
                }
            }
            break;
        case "2":
            let NomDepot = prompt("Entrer l'identifiant du compte a Crediter");
            for(let Compte of MesCompte){
                if(Compte.identifiant === NomDepot){
                    let MontantACrediter = prompt("Entrez le montant a deposer");
                    Compte.Crediter(MontantACrediter);
                }
            }
            break;
        case "3":
            let NomRetrait = prompt("Entrer l'identifiant du compte a Debiter");
            for(let Compte of MesCompte){
                if(Compte.identifiant === NomRetrait){
                    let MontantADebiter = prompt("Entrez le montant a debiter");
                    Compte.Debiter(MontantADebiter);
                }
            }
            break;
        case "4":
            let idClientReceveur = prompt("Entrez l'identifiant du compte sur lequel vous souhaitez transferer");
            let idClientEmetteur = prompt("Entrez l'identifiant du compte sur lequel le retrait va etre effectée");
            for( let Compte of MesCompte){
                if(Compte.identifiant === idClientEmetteur){
                    for( let Compte of MesCompte){
                        if(Compte.identifiant === idClientReceveur){
                            let MontantTransferer = prompt("Entrez le montant a transferer");
                            Compte.Transferer(MontantTransferer,idClientEmetteur,idClientReceveur);
                        } else {
                            alert("Le Compte Recepteur d'identifiant " + idClientReceveur + " n'existe pas");
                        }
                    }
                } else {
                    alert("Le Compte Emetteur d'identifiant " + idClientEmetteur + " n'existe pas");
                }
            }
            break;
        case "5":
            let NomClient = prompt("Entrer l'identifiant du compte a afficher");
            for(Compte of MesCompte){
                if(Compte.identifiant === NomClient){
                    Compte.AfficheSolde();
                }
            }
            break;
        default:
            alert("Desoler votre choix ne correspond pas a nos service");
            break;
    }
    continuer = prompt("Souhaitez-vous continuer ? (O/N)");
    if(continuer == "o" || continuer == "O"){
        continuer = true;
    } else {
        continuer = false;
    }
}