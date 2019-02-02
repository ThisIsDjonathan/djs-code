CREATE SEQUENCE lancamento_oid_seq;
CREATE SEQUENCE item_oid_seq;

CREATE TABLE Lancamento (
	oid int PRIMARY KEY DEFAULT NEXTVAL('lancamento_oid_seq'),
    dt_inicial timestamp,
	dt_final timestamp,
	vl_total numeric(8,2),
	observacao varchar(1000)
);

CREATE TABLE Item (
	oid int PRIMARY KEY DEFAULT NEXTVAL('item_oid_seq'),
    descricao varchar(255),
    valor numeric(8,2)
);

CREATE TABLE LancamentoItem (
	oid_lancamento int,
    oid_item int,
	CONSTRAINT pk PRIMARY KEY (oid_lancamento, oid_item),
    CONSTRAINT lancamento_fkey FOREIGN KEY (oid_lancamento) REFERENCES Lancamento (oid),
    CONSTRAINT item_fkey FOREIGN KEY (oid_item) REFERENCES Item (oid)
);