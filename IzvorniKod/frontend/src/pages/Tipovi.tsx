

type Ocitanje = {
    id: number;
    datumOcitavanja: string;
    tarifaVisoka: number;
    tarifaNiska: number;
    komentar: string;
  };
  
  type StavkaNaloga = {
    id: number;
    adresaBrojila: string;
  };
  
  type Nalog = {
    id: number;
    datumNalog: string;
    statusNalog: string;
    ocitanja: Ocitanje[];
    stavkeNaloga: StavkaNaloga[];
  };
  