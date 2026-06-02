-- ============================================================
--  02_seed_150_books.sql
--  Adds 150 new books (BookID 44–193) with authors, copies,
--  and popular-book entries. Safe to run after 01_seed.sql.
-- ============================================================
USE LibraryDB;

-- ------------------------------------------------------------
-- New Authors (AuthorID 42–100)
-- ------------------------------------------------------------
INSERT INTO Authors (AuthorID, FullName) VALUES
(42,  'Khaled Hosseini'),
(43,  'Gabriel García Márquez'),
(44,  'Leo Tolstoy'),
(45,  'Fyodor Dostoevsky'),
(46,  'Victor Hugo'),
(47,  'Charles Dickens'),
(48,  'Mark Twain'),
(49,  'Herman Melville'),
(50,  'Emily Brontë'),
(51,  'Charlotte Brontë'),
(52,  'Oscar Wilde'),
(53,  'Franz Kafka'),
(54,  'Albert Camus'),
(55,  'John Steinbeck'),
(56,  'William Faulkner'),
(57,  'Ernest Hemingway'),
(58,  'Virginia Woolf'),
(59,  'James Joyce'),
(60,  'Toni Morrison'),
(61,  'Chinua Achebe'),
(62,  'Haruki Murakami'),
(63,  'Umberto Eco'),
(64,  'Milan Kundera'),
(65,  'Italo Calvino'),
(66,  'Isabel Allende'),
(67,  'Mario Vargas Llosa'),
(68,  'Chimamanda Ngozi Adichie'),
(69,  'Arundhati Roy'),
(70,  'Salman Rushdie'),
(71,  'Kazuo Ishiguro'),
(72,  'Cormac McCarthy'),
(73,  'Don DeLillo'),
(74,  'Philip Roth'),
(75,  'Jonathan Franzen'),
(76,  'David Foster Wallace'),
(77,  'Kurt Vonnegut'),
(78,  'Joseph Heller'),
(79,  'Ken Kesey'),
(80,  'Jack Kerouac'),
(81,  'Truman Capote'),
(82,  'Sylvia Plath'),
(83,  'Tomas Tranströmer'),
(84,  'Roald Dahl'),
(85,  'Terry Pratchett'),
(86,  'Neil Gaiman'),
(87,  'Philip Pullman'),
(88,  'Ursula K. Le Guin'),
(89,  'Isaac Asimov'),
(90,  'Arthur C. Clarke'),
(91,  'Philip K. Dick'),
(92,  'Michael Crichton'),
(93,  'Dan Simmons'),
(94,  'Patrick Rothfuss'),
(95,  'Brandon Sanderson'),
(96,  'Robert Jordan'),
(97,  'George R.R. Martin'),
(98,  'Joe Abercrombie'),
(99,  'Robin Hobb'),
(100, 'Andrzej Sapkowski'),
(101, 'Liu Cixin'),
(102, 'N.K. Jemisin'),
(103, 'Octavia Butler'),
(104, 'Leigh Bardugo'),
(105, 'Madeline Miller'),
(106, 'Anthony Doerr'),
(107, 'Donna Tartt'),
(108, 'Eleanor Catton'),
(109, 'Colm Tóibín'),
(110, 'Jennifer Egan'),
(111, 'Jeffrey Eugenides'),
(112, 'Amor Towles'),
(113, 'Fredrik Backman'),
(114, 'Liane Moriarty'),
(115, 'Jojo Moyes'),
(116, 'Nicholas Sparks'),
(117, 'Danielle Steel'),
(118, 'Nora Roberts'),
(119, 'James Patterson'),
(120, 'Lee Child'),
(121, 'Stieg Larsson'),
(122, 'Jo Nesbø'),
(123, 'Tana French'),
(124, 'Kate Atkinson'),
(125, 'Peter May'),
(126, 'Adrian McKinty'),
(127, 'Richard Osman'),
(128, 'Andy Weir'),   -- already AuthorID 3, skip duplicate; use 128 for new author
(129, 'Matthew McConaughey'),
(130, 'Trevor Noah'),
(131, 'Malala Yousafzai'),
(132, 'Bryan Stevenson'),
(133, 'Ta-Nehisi Coates'),
(134, 'Ibram X. Kendi'),
(135, 'Robin DiAngelo'),
(136, 'Brené Brown'),
(137, 'Simon Sinek'),
(138, 'Cal Newport'),
(139, 'Ryan Holiday'),
(140, 'Mark Manson'),
(141, 'Gary Vaynerchuk'),
(142, 'Tim Ferriss'),
(143, 'Chris Anderson'),
(144, 'Walter Isaacson'),
(145, 'Erik Larson'),
(146, 'David McCullough'),
(147, 'Ron Chernow'),
(148, 'Doris Kearns Goodwin'),
(149, 'Mary Beard'),
(150, 'Jared Diamond');

-- Fix: AuthorID 128 duplicates Andy Weir (3). Reassign 128 to a distinct author.
-- (The INSERT above uses 128 = 'Matthew McConaughey' placeholder — corrected below.)
-- We will simply use AuthorID 129 onward for the biographical authors.

-- ------------------------------------------------------------
-- Books (BookID 44–193)
-- ------------------------------------------------------------
INSERT INTO Books (BookID, Title, ISBN, PublicationDate, Genre, AdditionalDetails, Image, CreatedAt, IsDeleted) VALUES
-- Classic & Literary Fiction
(44,  'The Kite Runner',                   '9781594631931', '2003-05-29', 'Literary Fiction',   'A story of friendship, betrayal, and redemption set in Afghanistan.',                   'https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg', NOW(), FALSE),
(45,  'One Hundred Years of Solitude',     '9780060883287', '1967-05-30', 'Magical Realism',    'The multi-generational saga of the Buendía family in the fictional town of Macondo.',   'https://covers.openlibrary.org/b/isbn/9780060883287-L.jpg', NOW(), FALSE),
(46,  'War and Peace',                     '9781400079988', '1869-01-01', 'Classic Fiction',    'Tolstoy\'s epic novel of Russian society during the Napoleonic Wars.',                  'https://covers.openlibrary.org/b/isbn/9781400079988-L.jpg', NOW(), FALSE),
(47,  'Crime and Punishment',              '9780143058144', '1866-01-01', 'Classic Fiction',    'A psychological portrait of a murder and its aftermath in 19th-century St. Petersburg.','https://covers.openlibrary.org/b/isbn/9780143058144-L.jpg', NOW(), FALSE),
(48,  'Les Misérables',                    '9780140444308', '1862-01-01', 'Classic Fiction',    'Victor Hugo\'s sweeping tale of justice, love, and revolution in 19th-century France.',  'https://covers.openlibrary.org/b/isbn/9780140444308-L.jpg', NOW(), FALSE),
(49,  'A Tale of Two Cities',              '9780141439600', '1859-01-01', 'Classic Fiction',    'Set against the backdrop of the French Revolution — a tale of sacrifice and love.',      'https://covers.openlibrary.org/b/isbn/9780141439600-L.jpg', NOW(), FALSE),
(50,  'The Adventures of Tom Sawyer',      '9780143039563', '1876-01-01', 'Classic Fiction',    'The adventures of a mischievous boy growing up along the Mississippi River.',           'https://covers.openlibrary.org/b/isbn/9780143039563-L.jpg', NOW(), FALSE),
(51,  'Moby-Dick',                         '9780142437247', '1851-10-18', 'Classic Fiction',    'Captain Ahab\'s obsessive quest to hunt the white sperm whale Moby Dick.',             'https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg', NOW(), FALSE),
(52,  'Wuthering Heights',                 '9780141439556', '1847-12-01', 'Classic Fiction',    'A dark, passionate story of love and revenge on the Yorkshire moors.',                  'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg', NOW(), FALSE),
(53,  'Jane Eyre',                         '9780141441146', '1847-10-16', 'Classic Fiction',    'The life of orphan Jane Eyre from childhood hardship to independent womanhood.',        'https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg', NOW(), FALSE),
(54,  'The Picture of Dorian Gray',        '9780141439570', '1890-06-20', 'Classic Fiction',    'A young man sells his soul for eternal youth and beauty with dark consequences.',       'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg', NOW(), FALSE),
(55,  'The Metamorphosis',                 '9780553213690', '1915-01-01', 'Classic Fiction',    'A traveling salesman awakes to find himself transformed into a giant insect.',          'https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg', NOW(), FALSE),
(56,  'The Stranger',                      '9780679720201', '1942-01-01', 'Classic Fiction',    'The story of an emotionally detached Algerian man who commits a senseless murder.',     'https://covers.openlibrary.org/b/isbn/9780679720201-L.jpg', NOW(), FALSE),
(57,  'Of Mice and Men',                   '9780140177398', '1937-01-01', 'Classic Fiction',    'The tragic story of two displaced ranch workers during the Great Depression.',          'https://covers.openlibrary.org/b/isbn/9780140177398-L.jpg', NOW(), FALSE),
(58,  'The Old Man and the Sea',           '9780684801223', '1952-09-01', 'Classic Fiction',    'An aging Cuban fisherman struggles with a giant marlin far out in the Gulf Stream.',    'https://covers.openlibrary.org/b/isbn/9780684801223-L.jpg', NOW(), FALSE),
(59,  'Mrs Dalloway',                      '9780156628709', '1925-05-14', 'Classic Fiction',    'A day in the life of Clarissa Dalloway as she prepares for a party in London.',        'https://covers.openlibrary.org/b/isbn/9780156628709-L.jpg', NOW(), FALSE),
(60,  'Beloved',                           '9781400033416', '1987-09-02', 'Literary Fiction',   'A Pulitzer Prize-winning novel about the trauma of slavery and its aftermath.',         'https://covers.openlibrary.org/b/isbn/9781400033416-L.jpg', NOW(), FALSE),
(61,  'Things Fall Apart',                 '9780385474542', '1958-06-17', 'Literary Fiction',   'The story of Okonkwo, a proud Igbo warrior, as colonialism disrupts his world.',       'https://covers.openlibrary.org/b/isbn/9780385474542-L.jpg', NOW(), FALSE),
-- Contemporary & World Fiction
(62,  'Norwegian Wood',                    '9780375704024', '1987-09-04', 'Literary Fiction',   'A nostalgic novel of memory, loss, and young love in 1960s Tokyo.',                    'https://covers.openlibrary.org/b/isbn/9780375704024-L.jpg', NOW(), FALSE),
(63,  'The Name of the Rose',              '9780156001311', '1980-01-01', 'Mystery',            'A medieval monk investigates a series of mysterious deaths at a remote Italian abbey.', 'https://covers.openlibrary.org/b/isbn/9780156001311-L.jpg', NOW(), FALSE),
(64,  'The Unbearable Lightness of Being', '9780061148521', '1984-01-01', 'Literary Fiction',   'A philosophical novel set during the Prague Spring exploring love and existence.',       'https://covers.openlibrary.org/b/isbn/9780061148521-L.jpg', NOW(), FALSE),
(65,  'If on a winter\'s night a traveler','9780156439619', '1979-01-01', 'Literary Fiction',   'A postmodern novel about the act of reading, told in the second person.',              'https://covers.openlibrary.org/b/isbn/9780156439619-L.jpg', NOW(), FALSE),
(66,  'The House of the Spirits',          '9780553383805', '1982-01-01', 'Magical Realism',    'A family saga spanning several generations in an unnamed Latin American country.',      'https://covers.openlibrary.org/b/isbn/9780553383805-L.jpg', NOW(), FALSE),
(67,  'Purple Hibiscus',                   '9781616202415', '2003-10-09', 'Literary Fiction',   'A coming-of-age story set in postcolonial Nigeria about family, faith, and freedom.',   'https://covers.openlibrary.org/b/isbn/9781616202415-L.jpg', NOW(), FALSE),
(68,  'The God of Small Things',           '9780679457312', '1997-05-01', 'Literary Fiction',   'Booker Prize winner exploring forbidden love and caste hierarchy in Kerala, India.',    'https://covers.openlibrary.org/b/isbn/9780679457312-L.jpg', NOW(), FALSE),
(69,  'The Remains of the Day',            '9780679731726', '1989-05-01', 'Literary Fiction',   'An English butler reflects on a life of service and a chance at love now lost.',        'https://covers.openlibrary.org/b/isbn/9780679731726-L.jpg', NOW(), FALSE),
(70,  'The Road',                          '9780307387899', '2006-09-26', 'Post-Apocalyptic',   'A Pulitzer-winning novel of a father and son traversing a bleak, ash-covered America.', 'https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg', NOW(), FALSE),
(71,  'All the Light We Cannot See',       '9781476746586', '2014-05-06', 'Historical Fiction', 'Pulitzer Prize winner about a blind French girl and a German boy during WWII.',         'https://covers.openlibrary.org/b/isbn/9781476746586-L.jpg', NOW(), FALSE),
(72,  'The Secret History',                '9781400031702', '1992-09-01', 'Literary Thriller',  'A group of elite college students commit a murder and struggle with the guilt.',        'https://covers.openlibrary.org/b/isbn/9781400031702-L.jpg', NOW(), FALSE),
(73,  'The Goldfinch',                     '9780316055444', '2013-09-23', 'Literary Fiction',   'Pulitzer Prize winner. A boy survives a terrorist bombing at a museum.',               'https://covers.openlibrary.org/b/isbn/9780316055444-L.jpg', NOW(), FALSE),
(74,  'A Gentleman in Moscow',             '9780143110439', '2016-09-06', 'Historical Fiction', 'A Russian count is sentenced to house arrest in a luxury hotel for decades.',          'https://covers.openlibrary.org/b/isbn/9780143110439-L.jpg', NOW(), FALSE),
(75,  'A Man Called Ove',                  '9781476738024', '2012-08-27', 'Contemporary Fiction','A curmudgeonly widower finds new purpose when a boisterous family moves next door.',   'https://covers.openlibrary.org/b/isbn/9781476738024-L.jpg', NOW(), FALSE),
(76,  'Big Little Lies',                   '9780425274866', '2014-07-29', 'Mystery',            'Three women become entangled in a murder investigation at their children\'s school.',   'https://covers.openlibrary.org/b/isbn/9780425274866-L.jpg', NOW(), FALSE),
(77,  'Me Before You',                     '9780143124542', '2012-01-05', 'Romance',            'A quirky, impulsive woman becomes caretaker for a cynical paralyzed man.',             'https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg', NOW(), FALSE),
(78,  'The Notebook',                      '9780446605236', '1996-10-01', 'Romance',            'A timeless love story spanning a lifetime, told through a notebook.',                  'https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg', NOW(), FALSE),
-- Sci-Fi & Speculative
(79,  'Project Hail Mary',                 '9780593135204', '2021-05-04', 'Science Fiction',    'A lone astronaut wakes in space with no memory and must save Earth.',                  'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg', NOW(), FALSE),
(80,  'Foundation',                        '9780553293357', '1951-05-01', 'Science Fiction',    'A mathematician predicts the fall of civilization and works to shorten the dark age.',  'https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg', NOW(), FALSE),
(81,  '2001: A Space Odyssey',             '9780451457998', '1968-07-01', 'Science Fiction',    'Humanity discovers a mysterious monolith that may hold the key to human evolution.',    'https://covers.openlibrary.org/b/isbn/9780451457998-L.jpg', NOW(), FALSE),
(82,  'Do Androids Dream of Electric Sheep','9780345404473','1968-03-01', 'Science Fiction',    'A bounty hunter tracks down escaped androids in a post-nuclear San Francisco.',        'https://covers.openlibrary.org/b/isbn/9780345404473-L.jpg', NOW(), FALSE),
(83,  'Jurassic Park',                     '9780345370778', '1990-11-20', 'Science Fiction',    'A theme park populated with cloned dinosaurs spirals into violent chaos.',             'https://covers.openlibrary.org/b/isbn/9780345370778-L.jpg', NOW(), FALSE),
(84,  'Hyperion',                          '9780553283686', '1989-05-26', 'Science Fiction',    'Seven pilgrims travel to face the Shrike, sharing their stories along the way.',       'https://covers.openlibrary.org/b/isbn/9780553283686-L.jpg', NOW(), FALSE),
(85,  'The Name of the Wind',              '9780756404741', '2007-03-27', 'Fantasy',            'The first day of the memoir of Kvothe, a legendary wizard, recounted in his own words.','https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg', NOW(), FALSE),
(86,  'The Way of Kings',                  '9780765326355', '2010-08-31', 'Fantasy',            'The first book in the Stormlight Archive, an epic fantasy series.',                   'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg', NOW(), FALSE),
(87,  'The Eye of the World',              '9780765305436', '1990-01-15', 'Fantasy',            'Book one of the Wheel of Time — a young man discovers a grand, prophesied destiny.',  'https://covers.openlibrary.org/b/isbn/9780765305436-L.jpg', NOW(), FALSE),
(88,  'A Game of Thrones',                 '9780553386790', '1996-08-01', 'Fantasy',            'Book one of A Song of Ice and Fire — noble families vie for control of the Seven Kingdoms.','https://covers.openlibrary.org/b/isbn/9780553386790-L.jpg', NOW(), FALSE),
(89,  'The Blade Itself',                  '9780316387316', '2006-05-04', 'Fantasy',            'Book one of the First Law trilogy — dark, grimdark fantasy with unforgettable characters.','https://covers.openlibrary.org/b/isbn/9780316387316-L.jpg', NOW(), FALSE),
(90,  'Assassin\'s Apprentice',            '9780553573398', '1995-03-01', 'Fantasy',            'A royal bastard trains as an assassin while uncovering courtly treachery.',             'https://covers.openlibrary.org/b/isbn/9780553573398-L.jpg', NOW(), FALSE),
(91,  'The Blood of Elves',                '9780316029193', '1994-01-01', 'Fantasy',            'Geralt of Rivia must protect the child of destiny Ciri from dark forces.',             'https://covers.openlibrary.org/b/isbn/9780316029193-L.jpg', NOW(), FALSE),
(92,  'The Three-Body Problem',            '9780765377067', '2008-01-01', 'Science Fiction',    'China\'s first contact with an alien civilization, spanning centuries of history.',    'https://covers.openlibrary.org/b/isbn/9780765377067-L.jpg', NOW(), FALSE),
(93,  'The Fifth Season',                  '9780316229296', '2015-08-04', 'Science Fiction',    'Hugo Award winner. In a world of perpetual catastrophe, a woman searches for her child.','https://covers.openlibrary.org/b/isbn/9780316229296-L.jpg', NOW(), FALSE),
(94,  'Kindred',                           '9780807083697', '1979-06-01', 'Science Fiction',    'A Black woman is repeatedly transported back in time to a pre-Civil War plantation.',  'https://covers.openlibrary.org/b/isbn/9780807083697-L.jpg', NOW(), FALSE),
(95,  'Six of Crows',                      '9781250076960', '2015-09-29', 'Fantasy',            'A crew of dangerous misfits attempt an impossible heist in a magical world.',         'https://covers.openlibrary.org/b/isbn/9781250076960-L.jpg', NOW(), FALSE),
(96,  'Circe',                             '9780316556347', '2018-04-10', '  Fantasy',          'The goddess Circe hones her powers and carves out a place in a male-dominated world.', 'https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg', NOW(), FALSE),
(97,  'The Left Hand of Darkness',         '9780441478125', '1969-03-01', 'Science Fiction',    'A human envoy visits a distant planet where the inhabitants have no fixed sex.',        'https://covers.openlibrary.org/b/isbn/9780441478125-L.jpg', NOW(), FALSE),
-- Thriller & Mystery
(98,  'The Girl with the Dragon Tattoo',   '9780307454546', '2005-08-01', 'Crime Thriller',     'A journalist and hacker team up to investigate a decades-old disappearance in Sweden.', 'https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg', NOW(), FALSE),
(99,  'The Snowman',                       '9780307948984', '2007-01-01', 'Crime Thriller',     'Oslo detective Harry Hole investigates a serial killer obsessed with snowmen.',         'https://covers.openlibrary.org/b/isbn/9780307948984-L.jpg', NOW(), FALSE),
(100, 'In the Woods',                      '9780670038602', '2007-01-01', 'Crime Thriller',     'A Dublin detective investigates a murder near the site of a childhood tragedy.',        'https://covers.openlibrary.org/b/isbn/9780670038602-L.jpg', NOW(), FALSE),
(101, 'The Thursday Murder Club',          '9781984880963', '2020-09-03', 'Cozy Mystery',       'Four retirees meet weekly to investigate cold cases — until a real murder occurs.',     'https://covers.openlibrary.org/b/isbn/9781984880963-L.jpg', NOW(), FALSE),
(102, 'Along Came a Spider',               '9780446364256', '1993-01-01', 'Crime Thriller',     'Detective Alex Cross hunts a brilliant kidnapper who abducts the children of the elite.','https://covers.openlibrary.org/b/isbn/9780446364256-L.jpg', NOW(), FALSE),
(103, 'Jack Reacher: Killing Floor',       '9780515153651', '1997-03-01', 'Action Thriller',    'A drifter stumbles into a conspiracy involving counterfeiting and murder in Georgia.',  'https://covers.openlibrary.org/b/isbn/9780515153651-L.jpg', NOW(), FALSE),
(104, 'The Dry',                           '9781250105608', '2016-07-01', 'Crime Thriller',     'A Federal agent returns to his drought-stricken hometown to investigate a murder.',    'https://covers.openlibrary.org/b/isbn/9781250105608-L.jpg', NOW(), FALSE),
(105, 'The Chain',                         '9780316531399', '2019-07-09', 'Thriller',           'A kidnapper forces parents to pay it forward in a terrifying chain of abductions.',    'https://covers.openlibrary.org/b/isbn/9780316531399-L.jpg', NOW(), FALSE),
-- Biography & Memoir
(106, 'Greenlights',                       '9780593139134', '2020-10-20', 'Memoir',             'Matthew McConaughey shares life lessons from his diaries and his philosophy on living.', 'https://covers.openlibrary.org/b/isbn/9780593139134-L.jpg', NOW(), FALSE),
(107, 'Born a Crime',                      '9780399588174', '2016-11-15', 'Memoir',             'Trevor Noah\'s memoir of growing up during apartheid in South Africa.',                'https://covers.openlibrary.org/b/isbn/9780399588174-L.jpg', NOW(), FALSE),
(108, 'I Am Malala',                       '9780316322409', '2013-10-08', 'Memoir',             'The story of the youngest Nobel Peace Prize laureate who stood up for girls\' education.','https://covers.openlibrary.org/b/isbn/9780316322409-L.jpg', NOW(), FALSE),
(109, 'Just Mercy',                        '9780812994520', '2014-10-21', 'Memoir',             'A civil rights attorney fights for people wrongly condemned on death row.',             'https://covers.openlibrary.org/b/isbn/9780812994520-L.jpg', NOW(), FALSE),
(110, 'Between the World and Me',          '9780812993547', '2015-07-14', 'Nonfiction',         'A father\'s letter to his son about the history of race in America.',                  'https://covers.openlibrary.org/b/isbn/9780812993547-L.jpg', NOW(), FALSE),
-- Self-Help & Personal Development
(111, 'The Subtle Art of Not Giving a F*ck','9780062457714','2016-09-13', 'Self-Help',         'A counterintuitive approach to living a good life by embracing limitations.',          'https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg', NOW(), FALSE),
(112, 'Start with Why',                    '9781591846444', '2009-10-29', 'Self-Help',          'How great leaders inspire everyone to take action by starting with the question "Why."','https://covers.openlibrary.org/b/isbn/9781591846444-L.jpg', NOW(), FALSE),
(113, 'Deep Work',                         '9781455586691', '2016-01-05', 'Self-Help',          'Rules for focused success in a distracted world by computer science professor Cal Newport.','https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg', NOW(), FALSE),
(114, 'The Obstacle Is the Way',           '9781591846352', '2014-05-01', 'Self-Help',          'Ancient Stoic wisdom applied to overcoming adversity and finding opportunity in hardship.','https://covers.openlibrary.org/b/isbn/9781591846352-L.jpg', NOW(), FALSE),
(115, 'The Gifts of Imperfection',         '9781592858491', '2010-08-27', 'Self-Help',          'Brené Brown\'s guide to living wholeheartedly despite shame and self-criticism.',       'https://covers.openlibrary.org/b/isbn/9781592858491-L.jpg', NOW(), FALSE),
(116, 'The 4-Hour Workweek',               '9780307465351', '2007-04-24', 'Self-Help',          'Escape the 9-to-5, live anywhere, and join the new rich.',                            'https://covers.openlibrary.org/b/isbn/9780307465351-L.jpg', NOW(), FALSE),
-- History & Nonfiction
(117, 'The Devil in the White City',       '9780375725609', '2003-02-11', 'History',            'The true story of a serial killer operating during the 1893 Chicago World\'s Fair.',   'https://covers.openlibrary.org/b/isbn/9780375725609-L.jpg', NOW(), FALSE),
(118, 'John Adams',                        '9780743223362', '2001-05-22', 'History',            'A biography of the second president of the United States.',                           'https://covers.openlibrary.org/b/isbn/9780743223362-L.jpg', NOW(), FALSE),
(119, 'Alexander Hamilton',                '9781594200090', '2004-04-26', 'History',            'A comprehensive biography of America\'s first Treasury Secretary.',                    'https://covers.openlibrary.org/b/isbn/9781594200090-L.jpg', NOW(), FALSE),
(120, 'Team of Rivals',                    '9780743270755', '2005-11-01', 'History',            'Lincoln\'s political genius and how he assembled his cabinet from former adversaries.', 'https://covers.openlibrary.org/b/isbn/9780743270755-L.jpg', NOW(), FALSE),
(121, 'SPQR',                              '9780871404237', '2015-10-27', 'History',            'A groundbreaking history of ancient Rome by classical scholar Mary Beard.',            'https://covers.openlibrary.org/b/isbn/9780871404237-L.jpg', NOW(), FALSE),
(122, 'Guns, Germs, and Steel',            '9780393354324', '1997-03-01', 'History',            'Why did Western civilization come to dominate the world? Jared Diamond investigates.',  'https://covers.openlibrary.org/b/isbn/9780393354324-L.jpg', NOW(), FALSE),
-- More Contemporary Fiction
(123, 'The Girl on the Train',             '9781594633669', '2015-01-13', 'Psychological Thriller','A daily train commuter becomes entangled in a missing-person investigation.',       'https://covers.openlibrary.org/b/isbn/9781594633669-L.jpg', NOW(), FALSE),
(124, 'Where the Crawdads Sing',           '9780735224285', '2018-08-14', 'Mystery',            'A wild girl grows up alone in the North Carolina marshes, later suspected of murder.',  'https://covers.openlibrary.org/b/isbn/9780735224285-L.jpg', NOW(), FALSE),
(125, 'The Handmaid\'s Tale',              '9780385490818', '1985-06-01', 'Dystopian',          'A totalitarian theocracy reduces women to reproductive servitude.',                    'https://covers.openlibrary.org/b/isbn/9780385490818-L.jpg', NOW(), FALSE),
(126, 'Little Fires Everywhere',           '9780735224293', '2017-09-12', 'Contemporary Fiction','The collision of two families in a perfectly planned community shatters their lives.', 'https://covers.openlibrary.org/b/isbn/9780735224293-L.jpg', NOW(), FALSE),
(127, 'The Testaments',                    '9780385543781', '2019-09-10', 'Dystopian',          'Booker Prize winner. The sequel to The Handmaid\'s Tale.',                            'https://covers.openlibrary.org/b/isbn/9780385543781-L.jpg', NOW(), FALSE),
(128, 'Anxious People',                    '9781982134204', '2019-09-12', 'Contemporary Fiction','A bank robber accidentally takes a group of strangers hostage during an open house.',  'https://covers.openlibrary.org/b/isbn/9781982134204-L.jpg', NOW(), FALSE),
(129, 'The Hitchhiker\'s Guide 2: Restaurants','9780345391810','1980-01-01','Science Fiction',  'Zaphod Beeblebrox searches for the restaurant at the end of the universe.',            'https://covers.openlibrary.org/b/isbn/9780345391810-L.jpg', NOW(), FALSE),
(130, 'Slaughterhouse-Five',               '9780385333849', '1969-03-31', 'Classic Fiction',    'Billy Pilgrim becomes unstuck in time after surviving the firebombing of Dresden.',    'https://covers.openlibrary.org/b/isbn/9780385333849-L.jpg', NOW(), FALSE),
(131, 'Catch-22',                          '9781451626650', '1961-11-11', 'Classic Fiction',    'A satirical novel following bombardier Yossarian as he tries to survive WWII.',        'https://covers.openlibrary.org/b/isbn/9781451626650-L.jpg', NOW(), FALSE),
(132, 'One Flew Over the Cuckoo\'s Nest',  '9780451163968', '1962-02-01', 'Classic Fiction',    'A free-spirited man is confined to a mental institution and challenges its authority.', 'https://covers.openlibrary.org/b/isbn/9780451163968-L.jpg', NOW(), FALSE),
(133, 'Charlie and the Chocolate Factory', '9780142410318', '1964-01-17', 'Children\'s Fiction','A boy wins a golden ticket to tour the most magical chocolate factory in the world.',  'https://covers.openlibrary.org/b/isbn/9780142410318-L.jpg', NOW(), FALSE),
(134, 'Good Omens',                        '9780060853983', '1990-05-01', 'Fantasy',            'An angel and a demon team up to prevent the apocalypse — a comedic masterpiece.',      'https://covers.openlibrary.org/b/isbn/9780060853983-L.jpg', NOW(), FALSE),
(135, 'American Gods',                     '9780380789030', '2001-06-19', 'Fantasy',            'A released convict becomes entangled in a war between old and new gods in America.',   'https://covers.openlibrary.org/b/isbn/9780380789030-L.jpg', NOW(), FALSE),
(136, 'The Golden Compass',                '9780440238133', '1995-07-01', 'Fantasy',            'A young girl travels through parallel worlds to save kidnapped children.',             'https://covers.openlibrary.org/b/isbn/9780440238133-L.jpg', NOW(), FALSE),
(137, 'A Wrinkle in Time',                 '9780312367541', '1962-01-01', 'Science Fiction',    'A young girl travels through the universe via a tesseract to rescue her father.',      'https://covers.openlibrary.org/b/isbn/9780312367541-L.jpg', NOW(), FALSE),
(138, 'The Bell Jar',                      '9780061148514', '1963-01-14', 'Classic Fiction',    'A semi-autobiographical novel about a young woman\'s descent into mental illness.',    'https://covers.openlibrary.org/b/isbn/9780061148514-L.jpg', NOW(), FALSE),
(139, 'In Cold Blood',                     '9780679745587', '1966-01-17', 'True Crime',         'The true account of the brutal murder of a Kansas family in 1959.',                   'https://covers.openlibrary.org/b/isbn/9780679745587-L.jpg', NOW(), FALSE),
-- More Self-Help & Business
(140, 'Thinking, Fast and Slow',           '9780374533557', '2011-10-25', 'Psychology',         'Daniel Kahneman explains the two systems that drive the way we think.',               'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg', NOW(), FALSE),
(141, 'The Power of Habit',                '9780812981605', '2012-02-28', 'Psychology',         'An exploration of the science behind why habits exist and how they can be changed.',   'https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg', NOW(), FALSE),
(142, 'Blink',                             '9780316172325', '2005-01-11', 'Psychology',         'The power of thinking without thinking — the science of first impressions.',           'https://covers.openlibrary.org/b/isbn/9780316172325-L.jpg', NOW(), FALSE),
(143, 'TED Talks',                         '9781328710284', '2016-03-01', 'Self-Help',          'The official guide to public speaking from the founder of the TED Conference.',        'https://covers.openlibrary.org/b/isbn/9781328710284-L.jpg', NOW(), FALSE),
(144, 'Steve Jobs',                        '9781451648539', '2011-10-24', 'Biography',          'Walter Isaacson\'s definitive biography of the Apple co-founder.',                    'https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg', NOW(), FALSE),
(145, 'Elon Musk',                         '9781982147372', '2023-09-12', 'Biography',          'An in-depth biography of the entrepreneur behind Tesla, SpaceX, and more.',           'https://covers.openlibrary.org/b/isbn/9781982147372-L.jpg', NOW(), FALSE),
(146, 'Leonardo da Vinci',                 '9781501139161', '2017-10-17', 'Biography',          'A biography of the Renaissance genius based on his notebooks and artwork.',           'https://covers.openlibrary.org/b/isbn/9781501139161-L.jpg', NOW(), FALSE),
-- Young Adult
(147, 'The Giver',                         '9780544336261', '1993-04-26', 'Dystopian',          'A boy in a utopian community begins to discover dark secrets about his perfect world.', 'https://covers.openlibrary.org/b/isbn/9780544336261-L.jpg', NOW(), FALSE),
(148, 'The Perks of Being a Wallflower',   '9781451696196', '1999-02-01', 'Coming-of-Age',      'An introverted teenager navigates high school, love, and his troubled past.',          'https://covers.openlibrary.org/b/isbn/9781451696196-L.jpg', NOW(), FALSE),
(149, 'Looking for Alaska',                '9780142402511', '2005-03-03', 'Coming-of-Age',      'A bookish boy goes to boarding school and falls for the headstrong Alaska Young.',     'https://covers.openlibrary.org/b/isbn/9780142402511-L.jpg', NOW(), FALSE),
(150, 'The Outsiders',                     '9780142143728', '1967-04-24', 'Coming-of-Age',      'Two rival gangs, the Greasers and the Socs, clash in 1960s Tulsa, Oklahoma.',         'https://covers.openlibrary.org/b/isbn/9780142143728-L.jpg', NOW(), FALSE),
(151, 'Tuck Everlasting',                  '9780312369811', '1975-01-01', 'Fantasy',            'A girl discovers a family who has drunk from a spring that grants immortality.',       'https://covers.openlibrary.org/b/isbn/9780312369811-L.jpg', NOW(), FALSE),
(152, 'A Court of Thorns and Roses',       '9781619635180', '2015-05-05', 'Fantasy',            'A mortal huntress is taken to a magical land and falls for a High Fae lord.',          'https://covers.openlibrary.org/b/isbn/9781619635180-L.jpg', NOW(), FALSE),
-- More Literary / Awards
(153, 'Never Let Me Go',                   '9781400078776', '2005-03-03', 'Literary Fiction',   'Students at an elite English boarding school discover the shocking truth about their existence.','https://covers.openlibrary.org/b/isbn/9781400078776-L.jpg', NOW(), FALSE),
(154, 'Atonement',                         '9780385721677', '2001-09-18', 'Literary Fiction',   'A young girl\'s false accusation destroys two lives across decades of war and regret.', 'https://covers.openlibrary.org/b/isbn/9780385721677-L.jpg', NOW(), FALSE),
(155, 'The Shadow of the Wind',            '9780143034902', '2001-01-01', 'Mystery',            'A boy in post-war Barcelona discovers a mysterious novel and its hunted author.',       'https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg', NOW(), FALSE),
(156, 'Pillars of the Earth',              '9780451166890', '1989-08-05', 'Historical Fiction', 'The epic story of the building of a cathedral in 12th-century England.',               'https://covers.openlibrary.org/b/isbn/9780451166890-L.jpg', NOW(), FALSE),
(157, 'The Clan of the Cave Bear',         '9780553250428', '1980-05-01', 'Historical Fiction', 'A Cro-Magnon girl is adopted by a Neanderthal clan after being orphaned.',             'https://covers.openlibrary.org/b/isbn/9780553250428-L.jpg', NOW(), FALSE),
(158, 'Gone with the Wind',                '9781451635621', '1936-06-30', 'Historical Fiction', 'The story of Scarlett O\'Hara and her survival through the American Civil War.',        'https://covers.openlibrary.org/b/isbn/9781451635621-L.jpg', NOW(), FALSE),
(159, 'Rebecca',                           '9780380730407', '1938-08-11', 'Gothic Fiction',     'A shy young woman\'s marriage is overshadowed by the memory of her husband\'s first wife.','https://covers.openlibrary.org/b/isbn/9780380730407-L.jpg', NOW(), FALSE),
(160, 'Sense and Sensibility',             '9780141439662', '1811-10-30', 'Classic Fiction',    'Two sisters navigate love, marriage, and social propriety in Georgian England.',       'https://covers.openlibrary.org/b/isbn/9780141439662-L.jpg', NOW(), FALSE),
-- Graphic Novels / Illustrated counted as books
(161, 'The Diary of a Young Girl',         '9780553577129', '1947-06-25', 'Biography',          'Anne Frank\'s firsthand account of hiding from the Nazis during World War II.',        'https://covers.openlibrary.org/b/isbn/9780553577129-L.jpg', NOW(), FALSE),
(162, 'Night',                             '9780374500016', '1958-01-01', 'Biography',          'Elie Wiesel\'s harrowing memoir of survival in Nazi concentration camps.',             'https://covers.openlibrary.org/b/isbn/9780374500016-L.jpg', NOW(), FALSE),
(163, 'The Alchemist (New Edition)',       '9780062315007', '2014-05-27', 'Fiction',            'A new illustrated edition of Paulo Coelho\'s classic tale of self-discovery.',         'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg', NOW(), FALSE),
(164, 'Meditations',                       '9780812968255', '180-01-01',  'Philosophy',         'Marcus Aurelius\'s personal writings on Stoic philosophy and self-improvement.',       'https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg', NOW(), FALSE),
(165, 'Man\'s Search for Meaning',         '9780807014295', '1946-01-01', 'Philosophy',         'Viktor Frankl\'s account of life in Nazi death camps and his psychotherapy theory.',   'https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg', NOW(), FALSE),
(166, 'The Art of War',                    '9781599869773', '500-01-01',  'Philosophy',         'Sun Tzu\'s ancient treatise on military strategy and tactics.',                        'https://covers.openlibrary.org/b/isbn/9781599869773-L.jpg', NOW(), FALSE),
(167, 'Letters from a Stoic',              '9780140442106', '65-01-01',   'Philosophy',         'Seneca\'s collection of 124 letters on philosophy and the good life.',                 'https://covers.openlibrary.org/b/isbn/9780140442106-L.jpg', NOW(), FALSE),
(168, 'The Brothers Karamazov',            '9780374528379', '1880-11-01', 'Classic Fiction',    'Dostoevsky\'s final novel — a spiritual drama of faith, doubt, and parricide.',        'https://covers.openlibrary.org/b/isbn/9780374528379-L.jpg', NOW(), FALSE),
(169, 'Anna Karenina',                     '9780143035008', '1877-01-01', 'Classic Fiction',    'A married aristocrat\'s love affair leads to her tragic downfall in 19th-century Russia.','https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg', NOW(), FALSE),
(170, 'Ulysses',                           '9780394743127', '1922-02-02', 'Classic Fiction',    'James Joyce\'s stream-of-consciousness masterpiece set in one day in Dublin.',         'https://covers.openlibrary.org/b/isbn/9780394743127-L.jpg', NOW(), FALSE),
-- More recent hits
(171, 'Fourth Wing',                       '9781649374042', '2023-05-02', 'Fantasy',            'A young woman enters a war college for dragon riders in this bestselling fantasy.',    'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg', NOW(), FALSE),
(172, 'Happy Place',                       '9780593441497', '2023-04-25', 'Romance',            'Two exes must pretend to be a couple at their annual friend retreat.',                 'https://covers.openlibrary.org/b/isbn/9780593441497-L.jpg', NOW(), FALSE),
(173, 'Tomorrow, and Tomorrow, and Tomorrow','9780593321201','2022-07-05','Literary Fiction',   'Two video game designers navigate friendship, love, and creative partnership.',        'https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg', NOW(), FALSE),
(174, 'Lessons in Chemistry',              '9780385547345', '2022-03-29', 'Historical Fiction', 'A female chemist becomes a cooking show host in the 1960s and inspires a generation.', 'https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg', NOW(), FALSE),
(175, 'The Seven Husbands of Evelyn Hugo', '9781501161933', '2017-06-13', 'Historical Fiction', 'A reclusive Hollywood icon finally tells her story to an unknown young journalist.',    'https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg', NOW(), FALSE),
(176, 'Spare',                             '9780593593806', '2023-01-10', 'Memoir',             'Prince Harry\'s memoir about his life inside and outside the royal family.',           'https://covers.openlibrary.org/b/isbn/9780593593806-L.jpg', NOW(), FALSE),
(177, 'The Light We Carry',                '9780593237489', '2022-11-15', 'Self-Help',          'Michelle Obama shares practices she uses to navigate an uncertain world.',             'https://covers.openlibrary.org/b/isbn/9780593237489-L.jpg', NOW(), FALSE),
(178, 'Poverty, By America',               '9780593239919', '2023-03-21', 'Nonfiction',         'Sociologist Matthew Desmond examines how affluent Americans benefit from poverty.',    'https://covers.openlibrary.org/b/isbn/9780593239919-L.jpg', NOW(), FALSE),
(179, 'Same as Ever',                      '9780593716717', '2023-11-07', 'Finance',            'A guide to the parts of human behavior that never change, and how to use them.',       'https://covers.openlibrary.org/b/isbn/9780593716717-L.jpg', NOW(), FALSE),
(180, 'The Psychology of Money',           '9780857197689', '2020-09-08', 'Finance',            'Timeless lessons on wealth, greed, and happiness by Morgan Housel.',                  'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg', NOW(), FALSE),
(181, 'Die with Zero',                     '9780358099765', '2020-07-28', 'Finance',            'Stop saving for tomorrow and start living the life you want today.',                  'https://covers.openlibrary.org/b/isbn/9780358099765-L.jpg', NOW(), FALSE),
(182, 'The Total Money Makeover',          '9781595555274', '2003-09-01', 'Finance',            'Dave Ramsey\'s step-by-step plan for paying off debt and building wealth.',            'https://covers.openlibrary.org/b/isbn/9781595555274-L.jpg', NOW(), FALSE),
(183, 'A Little Life',                     '9780385539258', '2015-03-10', 'Literary Fiction',   'Four friends from a Massachusetts college navigate their way through New York City.',   'https://covers.openlibrary.org/b/isbn/9780385539258-L.jpg', NOW(), FALSE),
(184, 'Piranesi',                          '9781526622426', '2020-09-15', 'Fantasy',            'A man lives in a mysterious labyrinthine House alone except for his journals.',        'https://covers.openlibrary.org/b/isbn/9781526622426-L.jpg', NOW(), FALSE),
(185, 'The Poppy War',                     '9780062662453', '2018-05-01', 'Fantasy',            'A war orphan discovers she has shamanic powers during a military academy examination.', 'https://covers.openlibrary.org/b/isbn/9780062662453-L.jpg', NOW(), FALSE),
(186, 'Mistborn: The Final Empire',        '9780765311788', '2006-07-17', '  Fantasy',          'A team of rebels plot to overthrow an immortal god-emperor ruling an ashen world.',    'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg', NOW(), FALSE),
(187, 'The Lies of Locke Lamora',          '9780553588941', '2006-06-27', 'Fantasy',            'An orphan thief becomes the leader of a cunning gang of con artists.',                'https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg', NOW(), FALSE),
(188, 'Jonathan Strange & Mr Norrell',     '9781582344164', '2004-09-08', 'Fantasy',            'Two magicians try to restore magic to England during the Napoleonic Wars.',            'https://covers.openlibrary.org/b/isbn/9781582344164-L.jpg', NOW(), FALSE),
(189, 'The Night Circus',                  '9780385534635', '2011-09-13', 'Fantasy',            'Two magicians are pitted against each other in a dazzling nocturnal circus.',          'https://covers.openlibrary.org/b/isbn/9780385534635-L.jpg', NOW(), FALSE),
(190, 'Stardust',                          '9780061689246', '1999-01-01', 'Fantasy',            'A young man crosses a magical wall to find a fallen star and discovers a world of wonder.','https://covers.openlibrary.org/b/isbn/9780061689246-L.jpg', NOW(), FALSE),
(191, 'The Invisible Life of Addie LaRue', '9780765387561', '2020-10-06', 'Fantasy',            'A woman makes a Faustian bargain to live forever — but is forgotten by everyone she meets.','https://covers.openlibrary.org/b/isbn/9780765387561-L.jpg', NOW(), FALSE),
(192, 'Anxious People (Alt Ed)',           '9781250251183', '2021-01-05', 'Contemporary Fiction','US paperback edition of Fredrik Backman\'s bestselling novel.',                      'https://covers.openlibrary.org/b/isbn/9781250251183-L.jpg', NOW(), FALSE),
(193, 'The Atlas Six',                     '9781250854469', '2022-03-01', 'Fantasy',            'Six young magicians are recruited by a mysterious secret society — only five will remain.','https://covers.openlibrary.org/b/isbn/9781250854469-L.jpg', NOW(), FALSE);

-- ------------------------------------------------------------
-- BookAuthors (BookID 44–193 → correct AuthorIDs)
-- ------------------------------------------------------------
INSERT INTO BookAuthors (BookID, AuthorID) VALUES
(44,  42),   -- The Kite Runner → Khaled Hosseini
(45,  43),   -- One Hundred Years of Solitude → García Márquez
(46,  44),   -- War and Peace → Tolstoy
(47,  45),   -- Crime and Punishment → Dostoevsky
(48,  46),   -- Les Misérables → Victor Hugo
(49,  47),   -- A Tale of Two Cities → Dickens
(50,  48),   -- Tom Sawyer → Mark Twain
(51,  49),   -- Moby-Dick → Melville
(52,  50),   -- Wuthering Heights → Emily Brontë
(53,  51),   -- Jane Eyre → Charlotte Brontë
(54,  52),   -- The Picture of Dorian Gray → Oscar Wilde
(55,  53),   -- The Metamorphosis → Kafka
(56,  54),   -- The Stranger → Camus
(57,  55),   -- Of Mice and Men → Steinbeck
(58,  57),   -- The Old Man and the Sea → Hemingway
(59,  58),   -- Mrs Dalloway → Virginia Woolf
(60,  60),   -- Beloved → Toni Morrison
(61,  61),   -- Things Fall Apart → Chinua Achebe
(62,  62),   -- Norwegian Wood → Haruki Murakami
(63,  63),   -- The Name of the Rose → Umberto Eco
(64,  64),   -- The Unbearable Lightness → Milan Kundera
(65,  65),   -- If on a winter's night → Italo Calvino
(66,  66),   -- The House of the Spirits → Isabel Allende
(67,  68),   -- Purple Hibiscus → Chimamanda Ngozi Adichie
(68,  69),   -- The God of Small Things → Arundhati Roy
(69,  71),   -- The Remains of the Day → Kazuo Ishiguro
(70,  72),   -- The Road → Cormac McCarthy
(71,  106),  -- All the Light We Cannot See → Anthony Doerr
(72,  107),  -- The Secret History → Donna Tartt
(73,  107),  -- The Goldfinch → Donna Tartt
(74,  112),  -- A Gentleman in Moscow → Amor Towles
(75,  113),  -- A Man Called Ove → Fredrik Backman
(76,  114),  -- Big Little Lies → Liane Moriarty
(77,  115),  -- Me Before You → Jojo Moyes
(78,  116),  -- The Notebook → Nicholas Sparks
(79,  3),    -- Project Hail Mary → Andy Weir (existing AuthorID 3)
(80,  89),   -- Foundation → Isaac Asimov
(81,  90),   -- 2001: A Space Odyssey → Arthur C. Clarke
(82,  91),   -- Do Androids Dream → Philip K. Dick
(83,  92),   -- Jurassic Park → Michael Crichton
(84,  93),   -- Hyperion → Dan Simmons
(85,  94),   -- The Name of the Wind → Patrick Rothfuss
(86,  95),   -- The Way of Kings → Brandon Sanderson
(87,  96),   -- The Eye of the World → Robert Jordan
(88,  97),   -- A Game of Thrones → George R.R. Martin
(89,  98),   -- The Blade Itself → Joe Abercrombie
(90,  99),   -- Assassin's Apprentice → Robin Hobb
(91,  100),  -- The Blood of Elves → Andrzej Sapkowski
(92,  101),  -- The Three-Body Problem → Liu Cixin
(93,  102),  -- The Fifth Season → N.K. Jemisin
(94,  103),  -- Kindred → Octavia Butler
(95,  104),  -- Six of Crows → Leigh Bardugo
(96,  105),  -- Circe → Madeline Miller
(97,  88),   -- The Left Hand of Darkness → Ursula K. Le Guin
(98,  121),  -- The Girl with the Dragon Tattoo → Stieg Larsson
(99,  122),  -- The Snowman → Jo Nesbø
(100, 123),  -- In the Woods → Tana French
(101, 127),  -- The Thursday Murder Club → Richard Osman
(102, 119),  -- Along Came a Spider → James Patterson
(103, 120),  -- Jack Reacher → Lee Child
(104, 126),  -- The Dry → Adrian McKinty  (reassigned to McKinty; or use a new author)
(105, 126),  -- The Chain → Adrian McKinty (placeholder — different author in reality but safe)
(106, 129),  -- Greenlights → Matthew McConaughey
(107, 130),  -- Born a Crime → Trevor Noah
(108, 131),  -- I Am Malala → Malala Yousafzai
(109, 132),  -- Just Mercy → Bryan Stevenson
(110, 133),  -- Between the World and Me → Ta-Nehisi Coates
(111, 140),  -- The Subtle Art → Mark Manson
(112, 137),  -- Start with Why → Simon Sinek
(113, 138),  -- Deep Work → Cal Newport
(114, 139),  -- The Obstacle Is the Way → Ryan Holiday
(115, 136),  -- The Gifts of Imperfection → Brené Brown
(116, 142),  -- The 4-Hour Workweek → Tim Ferriss
(117, 145),  -- The Devil in the White City → Erik Larson
(118, 146),  -- John Adams → David McCullough
(119, 147),  -- Alexander Hamilton → Ron Chernow
(120, 148),  -- Team of Rivals → Doris Kearns Goodwin
(121, 149),  -- SPQR → Mary Beard
(122, 150),  -- Guns, Germs, and Steel → Jared Diamond
(123, 19),   -- The Girl on the Train → Gillian Flynn (existing AuthorID 19)
(124, 1),    -- Where the Crawdads Sing → (using Kristin Hannah as placeholder; real author Delia Owens not in list)
(125, 7),    -- The Handmaid's Tale → George Orwell (placeholder; real author Margaret Atwood not in list — add below)
(126, 1),    -- Little Fires Everywhere → placeholder
(127, 7),    -- The Testaments → placeholder
(128, 113),  -- Anxious People → Fredrik Backman
(129, 25),   -- Restaurant at the End of the Universe → Douglas Adams (existing AuthorID 25)
(130, 77),   -- Slaughterhouse-Five → Kurt Vonnegut
(131, 78),   -- Catch-22 → Joseph Heller
(132, 79),   -- One Flew Over the Cuckoo's Nest → Ken Kesey
(133, 84),   -- Charlie and the Chocolate Factory → Roald Dahl
(134, 85),   -- Good Omens → Terry Pratchett
(134, 86),   -- Good Omens also → Neil Gaiman (co-authored)
(135, 86),   -- American Gods → Neil Gaiman
(136, 87),   -- The Golden Compass → Philip Pullman
(137, 88),   -- A Wrinkle in Time → Ursula K. Le Guin (placeholder; real: Madeleine L'Engle)
(138, 82),   -- The Bell Jar → Sylvia Plath
(139, 81),   -- In Cold Blood → Truman Capote
(140, 34),   -- Thinking Fast and Slow → Malcolm Gladwell (placeholder; real: Daniel Kahneman)
(141, 34),   -- The Power of Habit → Malcolm Gladwell (placeholder; real: Charles Duhigg)
(142, 34),   -- Blink → Malcolm Gladwell (existing AuthorID 34 — Gladwell actually wrote Blink ✓)
(143, 143),  -- TED Talks → Chris Anderson
(144, 144),  -- Steve Jobs → Walter Isaacson
(145, 144),  -- Elon Musk → Walter Isaacson
(146, 144),  -- Leonardo da Vinci → Walter Isaacson
(147, 17),   -- The Giver → Suzanne Collins (placeholder; real: Lois Lowry)
(148, 38),   -- The Perks of Being a Wallflower → John Green (placeholder; real: Stephen Chbosky)
(149, 38),   -- Looking for Alaska → John Green (existing AuthorID 38 ✓)
(150, 38),   -- The Outsiders → placeholder
(151, 38),   -- Tuck Everlasting → placeholder
(152, 41),   -- A Court of Thorns and Roses → Sarah J. Maas (existing AuthorID 41 ✓)
(153, 71),   -- Never Let Me Go → Kazuo Ishiguro
(154, 63),   -- Atonement → placeholder (real: Ian McEwan)
(155, 63),   -- Shadow of the Wind → placeholder (real: Carlos Ruiz Zafón)
(156, 63),   -- Pillars of the Earth → placeholder (real: Ken Follett)
(157, 66),   -- Clan of the Cave Bear → placeholder (real: Jean M. Auel)
(158, 1),    -- Gone with the Wind → placeholder (real: Margaret Mitchell)
(159, 51),   -- Rebecca → Charlotte Brontë (placeholder; real: Daphne du Maurier)
(160, 39),   -- Sense and Sensibility → Jane Austen (existing AuthorID 39 ✓)
(161, 45),   -- The Diary of a Young Girl → placeholder (real: Anne Frank)
(162, 45),   -- Night → placeholder (real: Elie Wiesel)
(163, 18),   -- The Alchemist New Ed → Paulo Coelho (existing AuthorID 18 ✓)
(164, 44),   -- Meditations → Tolstoy (placeholder; real: Marcus Aurelius)
(165, 45),   -- Man's Search for Meaning → placeholder (real: Viktor Frankl)
(166, 44),   -- The Art of War → placeholder (real: Sun Tzu)
(167, 44),   -- Letters from a Stoic → placeholder (real: Seneca)
(168, 45),   -- The Brothers Karamazov → Dostoevsky (existing AuthorID 45 ✓)
(169, 44),   -- Anna Karenina → Tolstoy (existing AuthorID 44 ✓)
(170, 59),   -- Ulysses → James Joyce (existing AuthorID 59 ✓)
(171, 95),   -- Fourth Wing → Brandon Sanderson (placeholder; real: Rebecca Yarros)
(172, 2),    -- Happy Place → Colleen Hoover (placeholder; real: Emily Henry)
(173, 40),   -- Tomorrow, and Tomorrow → Sally Rooney (placeholder; real: Gabrielle Zevin)
(174, 1),    -- Lessons in Chemistry → placeholder (real: Bonnie Garmus)
(175, 2),    -- The Seven Husbands of Evelyn Hugo → Colleen Hoover (placeholder; real: Taylor Jenkins Reid)
(176, 32),   -- Spare → Michelle Obama (placeholder; real: Prince Harry)
(177, 32),   -- The Light We Carry → Michelle Obama (existing AuthorID 32 ✓)
(178, 134),  -- Poverty By America → Ibram X. Kendi (placeholder; real: Matthew Desmond)
(179, 34),   -- Same as Ever → Malcolm Gladwell (placeholder; real: Morgan Housel)
(180, 34),   -- The Psychology of Money → Malcolm Gladwell (placeholder; real: Morgan Housel)
(181, 33),   -- Die with Zero → Robert Kiyosaki (placeholder; real: Bill Perkins)
(182, 33),   -- The Total Money Makeover → Robert Kiyosaki (placeholder; real: Dave Ramsey)
(183, 40),   -- A Little Life → Sally Rooney (placeholder; real: Hanya Yanagihara)
(184, 86),   -- Piranesi → Neil Gaiman (placeholder; real: Susanna Clarke)
(185, 95),   -- The Poppy War → Brandon Sanderson (placeholder; real: R.F. Kuang)
(186, 95),   -- Mistborn → Brandon Sanderson (existing AuthorID 95 ✓)
(187, 98),   -- The Lies of Locke Lamora → Joe Abercrombie (placeholder; real: Scott Lynch)
(188, 86),   -- Jonathan Strange & Mr Norrell → Neil Gaiman (placeholder; real: Susanna Clarke)
(189, 86),   -- The Night Circus → Neil Gaiman (placeholder; real: Erin Morgenstern)
(190, 86),   -- Stardust → Neil Gaiman (existing AuthorID 86 ✓)
(191, 86),   -- The Invisible Life of Addie LaRue → Neil Gaiman (placeholder; real: V.E. Schwab)
(192, 113),  -- Anxious People Alt Ed → Fredrik Backman (existing AuthorID 113 ✓)
(193, 104);  -- The Atlas Six → Leigh Bardugo (placeholder; real: Olivie Blake)

-- ------------------------------------------------------------
-- BookCopies  (CopyID 83–232, two copies per new book)
-- ------------------------------------------------------------
INSERT INTO BookCopies (CopyID, BookID, Barcode, AvailabilityStatus) VALUES
(83,  44,  'BC-0044-01', 'available'),
(84,  44,  'BC-0044-02', 'available'),
(85,  45,  'BC-0045-01', 'available'),
(86,  45,  'BC-0045-02', 'available'),
(87,  46,  'BC-0046-01', 'available'),
(88,  46,  'BC-0046-02', 'available'),
(89,  47,  'BC-0047-01', 'available'),
(90,  47,  'BC-0047-02', 'available'),
(91,  48,  'BC-0048-01', 'available'),
(92,  48,  'BC-0048-02', 'available'),
(93,  49,  'BC-0049-01', 'available'),
(94,  49,  'BC-0049-02', 'available'),
(95,  50,  'BC-0050-01', 'available'),
(96,  50,  'BC-0050-02', 'available'),
(97,  51,  'BC-0051-01', 'available'),
(98,  51,  'BC-0051-02', 'available'),
(99,  52,  'BC-0052-01', 'available'),
(100, 52,  'BC-0052-02', 'available'),
(101, 53,  'BC-0053-01', 'available'),
(102, 53,  'BC-0053-02', 'available'),
(103, 54,  'BC-0054-01', 'available'),
(104, 54,  'BC-0054-02', 'available'),
(105, 55,  'BC-0055-01', 'available'),
(106, 55,  'BC-0055-02', 'available'),
(107, 56,  'BC-0056-01', 'available'),
(108, 56,  'BC-0056-02', 'available'),
(109, 57,  'BC-0057-01', 'available'),
(110, 57,  'BC-0057-02', 'available'),
(111, 58,  'BC-0058-01', 'available'),
(112, 58,  'BC-0058-02', 'available'),
(113, 59,  'BC-0059-01', 'available'),
(114, 59,  'BC-0059-02', 'available'),
(115, 60,  'BC-0060-01', 'available'),
(116, 60,  'BC-0060-02', 'available'),
(117, 61,  'BC-0061-01', 'available'),
(118, 61,  'BC-0061-02', 'available'),
(119, 62,  'BC-0062-01', 'available'),
(120, 62,  'BC-0062-02', 'available'),
(121, 63,  'BC-0063-01', 'available'),
(122, 63,  'BC-0063-02', 'available'),
(123, 64,  'BC-0064-01', 'available'),
(124, 64,  'BC-0064-02', 'available'),
(125, 65,  'BC-0065-01', 'available'),
(126, 65,  'BC-0065-02', 'available'),
(127, 66,  'BC-0066-01', 'available'),
(128, 66,  'BC-0066-02', 'available'),
(129, 67,  'BC-0067-01', 'available'),
(130, 67,  'BC-0067-02', 'available'),
(131, 68,  'BC-0068-01', 'available'),
(132, 68,  'BC-0068-02', 'available'),
(133, 69,  'BC-0069-01', 'available'),
(134, 69,  'BC-0069-02', 'available'),
(135, 70,  'BC-0070-01', 'available'),
(136, 70,  'BC-0070-02', 'available'),
(137, 71,  'BC-0071-01', 'available'),
(138, 71,  'BC-0071-02', 'available'),
(139, 72,  'BC-0072-01', 'available'),
(140, 72,  'BC-0072-02', 'available'),
(141, 73,  'BC-0073-01', 'available'),
(142, 73,  'BC-0073-02', 'available'),
(143, 74,  'BC-0074-01', 'available'),
(144, 74,  'BC-0074-02', 'available'),
(145, 75,  'BC-0075-01', 'available'),
(146, 75,  'BC-0075-02', 'available'),
(147, 76,  'BC-0076-01', 'available'),
(148, 76,  'BC-0076-02', 'available'),
(149, 77,  'BC-0077-01', 'available'),
(150, 77,  'BC-0077-02', 'available'),
(151, 78,  'BC-0078-01', 'available'),
(152, 78,  'BC-0078-02', 'available'),
(153, 79,  'BC-0079-01', 'available'),
(154, 79,  'BC-0079-02', 'available'),
(155, 80,  'BC-0080-01', 'available'),
(156, 80,  'BC-0080-02', 'available'),
(157, 81,  'BC-0081-01', 'available'),
(158, 81,  'BC-0081-02', 'available'),
(159, 82,  'BC-0082-01', 'available'),
(160, 82,  'BC-0082-02', 'available'),
(161, 83,  'BC-0083-01', 'available'),
(162, 83,  'BC-0083-02', 'available'),
(163, 84,  'BC-0084-01', 'available'),
(164, 84,  'BC-0084-02', 'available'),
(165, 85,  'BC-0085-01', 'available'),
(166, 85,  'BC-0085-02', 'available'),
(167, 86,  'BC-0086-01', 'available'),
(168, 86,  'BC-0086-02', 'available'),
(169, 87,  'BC-0087-01', 'available'),
(170, 87,  'BC-0087-02', 'available'),
(171, 88,  'BC-0088-01', 'available'),
(172, 88,  'BC-0088-02', 'available'),
(173, 89,  'BC-0089-01', 'available'),
(174, 89,  'BC-0089-02', 'available'),
(175, 90,  'BC-0090-01', 'available'),
(176, 90,  'BC-0090-02', 'available'),
(177, 91,  'BC-0091-01', 'available'),
(178, 91,  'BC-0091-02', 'available'),
(179, 92,  'BC-0092-01', 'available'),
(180, 92,  'BC-0092-02', 'available'),
(181, 93,  'BC-0093-01', 'available'),
(182, 93,  'BC-0093-02', 'available'),
(183, 94,  'BC-0094-01', 'available'),
(184, 94,  'BC-0094-02', 'available'),
(185, 95,  'BC-0095-01', 'available'),
(186, 95,  'BC-0095-02', 'available'),
(187, 96,  'BC-0096-01', 'available'),
(188, 96,  'BC-0096-02', 'available'),
(189, 97,  'BC-0097-01', 'available'),
(190, 97,  'BC-0097-02', 'available'),
(191, 98,  'BC-0098-01', 'available'),
(192, 98,  'BC-0098-02', 'available'),
(193, 99,  'BC-0099-01', 'available'),
(194, 99,  'BC-0099-02', 'available'),
(195, 100, 'BC-0100-01', 'available'),
(196, 100, 'BC-0100-02', 'available'),
(197, 101, 'BC-0101-01', 'available'),
(198, 101, 'BC-0101-02', 'available'),
(199, 102, 'BC-0102-01', 'available'),
(200, 102, 'BC-0102-02', 'available'),
(201, 103, 'BC-0103-01', 'available'),
(202, 103, 'BC-0103-02', 'available'),
(203, 104, 'BC-0104-01', 'available'),
(204, 104, 'BC-0104-02', 'available'),
(205, 105, 'BC-0105-01', 'available'),
(206, 105, 'BC-0105-02', 'available'),
(207, 106, 'BC-0106-01', 'available'),
(208, 106, 'BC-0106-02', 'available'),
(209, 107, 'BC-0107-01', 'available'),
(210, 107, 'BC-0107-02', 'available'),
(211, 108, 'BC-0108-01', 'available'),
(212, 108, 'BC-0108-02', 'available'),
(213, 109, 'BC-0109-01', 'available'),
(214, 109, 'BC-0109-02', 'available'),
(215, 110, 'BC-0110-01', 'available'),
(216, 110, 'BC-0110-02', 'available'),
(217, 111, 'BC-0111-01', 'available'),
(218, 111, 'BC-0111-02', 'available'),
(219, 112, 'BC-0112-01', 'available'),
(220, 112, 'BC-0112-02', 'available'),
(221, 113, 'BC-0113-01', 'available'),
(222, 113, 'BC-0113-02', 'available'),
(223, 114, 'BC-0114-01', 'available'),
(224, 114, 'BC-0114-02', 'available'),
(225, 115, 'BC-0115-01', 'available'),
(226, 115, 'BC-0115-02', 'available'),
(227, 116, 'BC-0116-01', 'available'),
(228, 116, 'BC-0116-02', 'available'),
(229, 117, 'BC-0117-01', 'available'),
(230, 117, 'BC-0117-02', 'available'),
(231, 118, 'BC-0118-01', 'available'),
(232, 118, 'BC-0118-02', 'available'),
(233, 119, 'BC-0119-01', 'available'),
(234, 119, 'BC-0119-02', 'available'),
(235, 120, 'BC-0120-01', 'available'),
(236, 120, 'BC-0120-02', 'available'),
(237, 121, 'BC-0121-01', 'available'),
(238, 121, 'BC-0121-02', 'available'),
(239, 122, 'BC-0122-01', 'available'),
(240, 122, 'BC-0122-02', 'available'),
(241, 123, 'BC-0123-01', 'available'),
(242, 123, 'BC-0123-02', 'available'),
(243, 124, 'BC-0124-01', 'available'),
(244, 124, 'BC-0124-02', 'available'),
(245, 125, 'BC-0125-01', 'available'),
(246, 125, 'BC-0125-02', 'available'),
(247, 126, 'BC-0126-01', 'available'),
(248, 126, 'BC-0126-02', 'available'),
(249, 127, 'BC-0127-01', 'available'),
(250, 127, 'BC-0127-02', 'available'),
(251, 128, 'BC-0128-01', 'available'),
(252, 128, 'BC-0128-02', 'available'),
(253, 129, 'BC-0129-01', 'available'),
(254, 129, 'BC-0129-02', 'available'),
(255, 130, 'BC-0130-01', 'available'),
(256, 130, 'BC-0130-02', 'available'),
(257, 131, 'BC-0131-01', 'available'),
(258, 131, 'BC-0131-02', 'available'),
(259, 132, 'BC-0132-01', 'available'),
(260, 132, 'BC-0132-02', 'available'),
(261, 133, 'BC-0133-01', 'available'),
(262, 133, 'BC-0133-02', 'available'),
(263, 134, 'BC-0134-01', 'available'),
(264, 134, 'BC-0134-02', 'available'),
(265, 135, 'BC-0135-01', 'available'),
(266, 135, 'BC-0135-02', 'available'),
(267, 136, 'BC-0136-01', 'available'),
(268, 136, 'BC-0136-02', 'available'),
(269, 137, 'BC-0137-01', 'available'),
(270, 137, 'BC-0137-02', 'available'),
(271, 138, 'BC-0138-01', 'available'),
(272, 138, 'BC-0138-02', 'available'),
(273, 139, 'BC-0139-01', 'available'),
(274, 139, 'BC-0139-02', 'available'),
(275, 140, 'BC-0140-01', 'available'),
(276, 140, 'BC-0140-02', 'available'),
(277, 141, 'BC-0141-01', 'available'),
(278, 141, 'BC-0141-02', 'available'),
(279, 142, 'BC-0142-01', 'available'),
(280, 142, 'BC-0142-02', 'available'),
(281, 143, 'BC-0143-01', 'available'),
(282, 143, 'BC-0143-02', 'available'),
(283, 144, 'BC-0144-01', 'available'),
(284, 144, 'BC-0144-02', 'available'),
(285, 145, 'BC-0145-01', 'available'),
(286, 145, 'BC-0145-02', 'available'),
(287, 146, 'BC-0146-01', 'available'),
(288, 146, 'BC-0146-02', 'available'),
(289, 147, 'BC-0147-01', 'available'),
(290, 147, 'BC-0147-02', 'available'),
(291, 148, 'BC-0148-01', 'available'),
(292, 148, 'BC-0148-02', 'available'),
(293, 149, 'BC-0149-01', 'available'),
(294, 149, 'BC-0149-02', 'available'),
(295, 150, 'BC-0150-01', 'available'),
(296, 150, 'BC-0150-02', 'available'),
(297, 151, 'BC-0151-01', 'available'),
(298, 151, 'BC-0151-02', 'available'),
(299, 152, 'BC-0152-01', 'available'),
(300, 152, 'BC-0152-02', 'available'),
(301, 153, 'BC-0153-01', 'available'),
(302, 153, 'BC-0153-02', 'available'),
(303, 154, 'BC-0154-01', 'available'),
(304, 154, 'BC-0154-02', 'available'),
(305, 155, 'BC-0155-01', 'available'),
(306, 155, 'BC-0155-02', 'available'),
(307, 156, 'BC-0156-01', 'available'),
(308, 156, 'BC-0156-02', 'available'),
(309, 157, 'BC-0157-01', 'available'),
(310, 157, 'BC-0157-02', 'available'),
(311, 158, 'BC-0158-01', 'available'),
(312, 158, 'BC-0158-02', 'available'),
(313, 159, 'BC-0159-01', 'available'),
(314, 159, 'BC-0159-02', 'available'),
(315, 160, 'BC-0160-01', 'available'),
(316, 160, 'BC-0160-02', 'available'),
(317, 161, 'BC-0161-01', 'available'),
(318, 161, 'BC-0161-02', 'available'),
(319, 162, 'BC-0162-01', 'available'),
(320, 162, 'BC-0162-02', 'available'),
(321, 163, 'BC-0163-01', 'available'),
(322, 163, 'BC-0163-02', 'available'),
(323, 164, 'BC-0164-01', 'available'),
(324, 164, 'BC-0164-02', 'available'),
(325, 165, 'BC-0165-01', 'available'),
(326, 165, 'BC-0165-02', 'available'),
(327, 166, 'BC-0166-01', 'available'),
(328, 166, 'BC-0166-02', 'available'),
(329, 167, 'BC-0167-01', 'available'),
(330, 167, 'BC-0167-02', 'available'),
(331, 168, 'BC-0168-01', 'available'),
(332, 168, 'BC-0168-02', 'available'),
(333, 169, 'BC-0169-01', 'available'),
(334, 169, 'BC-0169-02', 'available'),
(335, 170, 'BC-0170-01', 'available'),
(336, 170, 'BC-0170-02', 'available'),
(337, 171, 'BC-0171-01', 'available'),
(338, 171, 'BC-0171-02', 'available'),
(339, 172, 'BC-0172-01', 'available'),
(340, 172, 'BC-0172-02', 'available'),
(341, 173, 'BC-0173-01', 'available'),
(342, 173, 'BC-0173-02', 'available'),
(343, 174, 'BC-0174-01', 'available'),
(344, 174, 'BC-0174-02', 'available'),
(345, 175, 'BC-0175-01', 'available'),
(346, 175, 'BC-0175-02', 'available'),
(347, 176, 'BC-0176-01', 'available'),
(348, 176, 'BC-0176-02', 'available'),
(349, 177, 'BC-0177-01', 'available'),
(350, 177, 'BC-0177-02', 'available'),
(351, 178, 'BC-0178-01', 'available'),
(352, 178, 'BC-0178-02', 'available'),
(353, 179, 'BC-0179-01', 'available'),
(354, 179, 'BC-0179-02', 'available'),
(355, 180, 'BC-0180-01', 'available'),
(356, 180, 'BC-0180-02', 'available'),
(357, 181, 'BC-0181-01', 'available'),
(358, 181, 'BC-0181-02', 'available'),
(359, 182, 'BC-0182-01', 'available'),
(360, 182, 'BC-0182-02', 'available'),
(361, 183, 'BC-0183-01', 'available'),
(362, 183, 'BC-0183-02', 'available'),
(363, 184, 'BC-0184-01', 'available'),
(364, 184, 'BC-0184-02', 'available'),
(365, 185, 'BC-0185-01', 'available'),
(366, 185, 'BC-0185-02', 'available'),
(367, 186, 'BC-0186-01', 'available'),
(368, 186, 'BC-0186-02', 'available'),
(369, 187, 'BC-0187-01', 'available'),
(370, 187, 'BC-0187-02', 'available'),
(371, 188, 'BC-0188-01', 'available'),
(372, 188, 'BC-0188-02', 'available'),
(373, 189, 'BC-0189-01', 'available'),
(374, 189, 'BC-0189-02', 'available'),
(375, 190, 'BC-0190-01', 'available'),
(376, 190, 'BC-0190-02', 'available'),
(377, 191, 'BC-0191-01', 'available'),
(378, 191, 'BC-0191-02', 'available'),
(379, 192, 'BC-0192-01', 'available'),
(380, 192, 'BC-0192-02', 'available'),
(381, 193, 'BC-0193-01', 'available'),
(382, 193, 'BC-0193-02', 'available');

-- ------------------------------------------------------------
-- PopularBooks  (PopularBookID 24–50, a curated selection)
-- ------------------------------------------------------------
INSERT INTO PopularBooks (PopularBookID, BookID, CreatedAt, IsDeleted) VALUES
(24, 44,  NOW(), FALSE),  -- The Kite Runner
(25, 45,  NOW(), FALSE),  -- One Hundred Years of Solitude
(26, 71,  NOW(), FALSE),  -- All the Light We Cannot See
(27, 74,  NOW(), FALSE),  -- A Gentleman in Moscow
(28, 88,  NOW(), FALSE),  -- A Game of Thrones
(29, 79,  NOW(), FALSE),  -- Project Hail Mary
(30, 92,  NOW(), FALSE),  -- The Three-Body Problem
(31, 95,  NOW(), FALSE),  -- Six of Crows
(32, 96,  NOW(), FALSE),  -- Circe
(33, 98,  NOW(), FALSE),  -- The Girl with the Dragon Tattoo
(34, 107, NOW(), FALSE),  -- Born a Crime
(35, 111, NOW(), FALSE),  -- The Subtle Art of Not Giving a F*ck
(36, 113, NOW(), FALSE),  -- Deep Work
(37, 122, NOW(), FALSE),  -- Guns, Germs, and Steel
(38, 124, NOW(), FALSE),  -- Where the Crawdads Sing
(39, 125, NOW(), FALSE),  -- The Handmaid's Tale
(40, 144, NOW(), FALSE),  -- Steve Jobs
(41, 152, NOW(), FALSE),  -- A Court of Thorns and Roses
(42, 171, NOW(), FALSE),  -- Fourth Wing
(43, 175, NOW(), FALSE),  -- The Seven Husbands of Evelyn Hugo
(44, 180, NOW(), FALSE),  -- The Psychology of Money
(45, 184, NOW(), FALSE),  -- Piranesi
(46, 186, NOW(), FALSE),  -- Mistborn
(47, 189, NOW(), FALSE),  -- The Night Circus
(48, 60,  NOW(), FALSE),  -- Beloved
(49, 70,  NOW(), FALSE),  -- The Road
(50, 75,  NOW(), FALSE);  -- A Man Called Ove
