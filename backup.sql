--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-15 15:16:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4893 (class 0 OID 16504)
-- Dependencies: 222
-- Data for Name: brojilo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brojilo (id_brojilo, serijski_broj_brojilo, tip_brojila, adresa, id_kupac) FROM stdin;
1	B001	Digitalno	Ulica 1, Zagreb	1
2	B002	Analogno	Ulica 2, Zagreb	2
3	B003	Digitalno	Ulica 3, Split	3
4	B004	Analogno	Ulica 4, Rijeka	4
5	B005	Digitalno	Ulica 5, Osijek	5
6	B006	Analogno	Ulica 6, Dubrovnik	6
7	B007	Digitalno	Ulica 7, Zadar	7
8	B008	Analogno	Ulica 8, Varaždin	1
9	B009	Digitalno	Ulica 9, Šibenik	2
10	B010	Analogno	Ulica 10, Pula	3
\.


--
-- TOC entry 4891 (class 0 OID 16497)
-- Dependencies: 220
-- Data for Name: kupac; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kupac (id_kupac, ime_kupac, prezime_kupac, telefon_kupac) FROM stdin;
1	Ivan	Ivić	0911111111
2	Ana	Anić	0922222222
3	Marko	Marković	0933333333
4	Petra	Petrić	0944444444
5	Luka	Lukić	0955555555
6	Maja	Majić	0966666666
7	Nikola	Nikolić	0977777777
\.


--
-- TOC entry 4897 (class 0 OID 16523)
-- Dependencies: 226
-- Data for Name: nalog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nalog (id_nalog, datum_nalog, status_nalog, id_radnik) FROM stdin;
2	2024-06-15 09:00:00	Aktivan	2
3	2024-06-15 10:00:00	Završen	3
4	2024-06-15 11:00:00	Završen	4
5	2024-06-15 12:00:00	Aktivan	5
6	2024-06-16 08:30:00	Aktivan	1
7	2024-06-16 09:30:00	Završen	2
8	2024-06-16 10:30:00	Aktivan	3
9	2024-06-16 11:30:00	Završen	4
10	2024-06-16 12:30:00	Aktivan	5
\.


--
-- TOC entry 4901 (class 0 OID 16552)
-- Dependencies: 230
-- Data for Name: ocitanje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ocitanje (id_ocitanje, datum_ocitavanja, tarifa_visoka, tarifa_niska, komentar, id_stavka) FROM stdin;
3	2024-06-15 10:15:00	130.70	65.30	Greška na brojilu	3
4	2024-06-15 11:15:00	115.20	57.10	Očitanje uspješno	4
5	2024-06-15 12:15:00	125.80	63.40	Očitanje uspješno	5
6	2024-06-16 08:45:00	140.90	70.45	Greška na brojilu	6
7	2024-06-16 09:45:00	105.60	52.80	Očitanje uspješno	7
8	2024-06-16 10:45:00	150.30	75.15	Očitanje uspješno	8
9	2024-06-16 11:45:00	95.20	47.60	Greška u očitanju	9
10	2024-06-16 12:45:00	135.70	67.85	Očitanje uspješno	10
2	2024-06-15 09:15:00	110.40	55.20	Očitanje uspješno	\N
11	2003-02-12 11:32:00	435.24	423.12	komentar	3
12	1234-03-05 10:50:00	31313.23	32323.12	ruki	6
13	3213-02-12 11:32:00	2323.23	232.11	mjau	10
14	2003-03-12 11:32:00	123.23	111.23	Očitali smo i ovaj	3
15	3123-02-12 11:12:00	234.23	23.12	evo test	4
16	1221-12-05 10:50:00	23242.45	2323.12	kdoanf	3
\.


--
-- TOC entry 4895 (class 0 OID 16516)
-- Dependencies: 224
-- Data for Name: radnik; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.radnik (id_radnik, ime_radnik, prezime_radnik, telefon_radnik) FROM stdin;
1	Josip	Josić	0981234567
2	Ivana	Ivandić	0992345678
3	Karlo	Karlić	0913456789
4	Martina	Martinić	0924567890
5	Tomislav	Tomić	0935678901
\.


--
-- TOC entry 4899 (class 0 OID 16535)
-- Dependencies: 228
-- Data for Name: stavka_naloga; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stavka_naloga (id_stavka, id_nalog, id_brojilo, adresa_brojila) FROM stdin;
3	2	3	Ulica 3, Split
4	2	4	Ulica 4, Rijeka
5	3	5	Ulica 5, Osijek
6	3	6	Ulica 6, Dubrovnik
7	4	7	Ulica 7, Zadar
8	4	8	Ulica 8, Varaždin
9	5	9	Ulica 9, Šibenik
10	5	10	Ulica 10, Pula
11	6	1	Ulica 1, Zagreb
12	7	2	Ulica 2, Zagreb
13	8	3	Ulica 3, Split
14	9	4	Ulica 4, Rijeka
15	10	5	Ulica 5, Osijek
\.


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 221
-- Name: brojilo_id_brojilo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brojilo_id_brojilo_seq', 10, true);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 219
-- Name: kupac_id_kupac_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kupac_id_kupac_seq', 7, true);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 225
-- Name: nalog_id_nalog_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nalog_id_nalog_seq', 10, true);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 229
-- Name: ocitanje_id_ocitanje_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ocitanje_id_ocitanje_seq', 16, true);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 223
-- Name: radnik_id_radnik_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.radnik_id_radnik_seq', 5, true);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 227
-- Name: stavka_naloga_id_stavka_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stavka_naloga_id_stavka_seq', 15, true);


-- Completed on 2025-01-15 15:16:11

--
-- PostgreSQL database dump complete
--

