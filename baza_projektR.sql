-- Table for KUPAC (Customer)
CREATE TABLE KUPAC (
    id_kupac CHAR(11) PRIMARY KEY,  -- OIB
    ime_kupac VARCHAR(50),
    prezime_kupac VARCHAR(50),
    telefon_kupac VARCHAR(20),
    adresa_kupac VARCHAR(100)
);

-- Table for BROJILO (Meter)
CREATE TABLE BROJILO (
    id_brojilo INT PRIMARY KEY,
    serijski_broj_brojilo VARCHAR(50),
    tip_brojila VARCHAR(50),
    id_kupac CHAR(11),
    FOREIGN KEY (id_kupac) REFERENCES KUPAC(id_kupac) ON DELETE SET NULL
);

-- Table for RADNIK (Worker)
CREATE TABLE RADNIK (
    id_radnik INT PRIMARY KEY,
    ime_radnik VARCHAR(50),
    prezime_radnik VARCHAR(50),
    telefon_radnik VARCHAR(20)
);

-- Table for NALOG (Order)
CREATE TABLE NALOG (
    id_nalog INT PRIMARY KEY,
    id_brojilo INT,
    id_radnik INT,
    datum_nalog DATE,
    status_nalog VARCHAR(50),
    FOREIGN KEY (id_brojilo) REFERENCES BROJILO(id_brojilo) ON DELETE SET NULL,
    FOREIGN KEY (id_radnik) REFERENCES RADNIK(id_radnik) ON DELETE SET NULL
);

-- Table for OCITANJE (Reading)
CREATE TABLE OCITANJE (
    id_ocitanje INT PRIMARY KEY,
    id_nalog INT,
    datum_ocitavanja DATE,
    tarifa_niska DECIMAL(10, 2),
    tarifa_visoka DECIMAL(10, 2),
    komentar TEXT,
    FOREIGN KEY (id_nalog) REFERENCES NALOG(id_nalog) ON DELETE SET NULL
);
