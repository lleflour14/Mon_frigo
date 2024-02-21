export default class Produit{
    constructor (id,nom,qte,URL_photo){
        this._id = id;
        this._nom = nom;
        this._qte = qte;
        this._URL_photo = URL_photo;

    }

    get id() {
        return this._id;
    }

    get URL_photo(){
        return this._URL_photo;
    }

    get nom(){
        return this._nom
    }

    get qte(){
        return this._qte
    }

    modif_qte(q){
        this._qte = q;
    }

}