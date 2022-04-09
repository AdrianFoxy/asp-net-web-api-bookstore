using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;

namespace WebBookShopProject.Data
{
    public class AppDbInitialer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

                if (!context.Publisher.Any())
                {
                    context.Publisher.AddRange(new List<Publisher>()
                {
                        new Publisher() { Name = "КнигоЛав"},
                        new Publisher() { Name = "КСД"},
                        new Publisher() {Name = "Талант"},
                        new Publisher() {Name = "ИсторияЭд"},
                        new Publisher() {Name = "Незнайка"}
                });
                    context.SaveChanges();
                }

                if (!context.Author.Any())
                {
                    context.Author.AddRange(new List<Author>()
                {
                    new Author ()
                    {
                        FullName = "Анджей Сапковский",
                        ImageUrl = "/img/authorImage_sapkowski.jpg",
                        Description = "Польский писатель-фантаст и публицист, автор популярной фэнтези-саги «Ведьмак»."
                    },
                    new Author ()
                    {
                        FullName = "Сергей Клочков",
                        ImageUrl = "/img/authorImage_Clockovski.jpg",
                        Description = "Российский писатель-фантаст."
                    },
                    new Author ()
                    {
                        FullName = "Джон Рональд Руэл Толкин",
                        ImageUrl  = "/img/authorImage_tolkin.jpg",
                        Description = "Английский писатель и поэт, переводчик, лингвист, филолог. Толкин — один из самых известных писателей, автор более двухсот различных публикаций (37 книг, 63 статьи, 121 перевод) и множества незавершённых работ. Наиболее известен как автор классических произведений «высокого фэнтези»: «Хоббит, или Туда и обратно», «Властелин колец» и «Сильмариллион». Эти книги породили сотни переводов, подражаний и продолжений и стали заметным явлением культуры XX века."
                    },
                    new Author ()
                    {
                        FullName = "Ли Виксен",
                        ImageUrl = "/img/authorImage_LeVicsenjpg.jpg",
                        Description = "Полина Гладыш – молодая писательница из Ижевска. Она выросла в семье журналистов. Закончила Институт социальных коммуникаций УдГУ по специальности «PR». Сама успела поработать в СМИ и выйти замуж. На протяжении всей своей жизни никогда не расставалась с книгами.Полина решила, что хочет написать книгу в 25 лет. У юной девушки не складывалась личная жизнь, было свободное время. К тому же она не ходила гулять и не увлекалась сериалами. Полина хотела написать фэнтези-историю, которая будет интересна таким же, как она."
                    },
                    new Author()
                    {
                        FullName = "Джорж Сэмюэль Клейсон",
                        ImageUrl = "/img/authorImage_SamuelKleison.jpg",
                        Description = "Автор книги «Самый богатый человек в Вавилоне», основатель картографической компании «Клейсон Мэп»."
                    },
                    new Author()
                    {
                        FullName = "Сара Джанет Маас",
                        ImageUrl = "/img/authorImage_SaraMaas.jpg",
                        Description = "В средней школе Сара слыла «рассказчиком небылиц» и начала писать свой первый роман в 16 лет. Он был по сути переосмыслением детской сказки «Золушка». Ведь как бы сложилась сказка, если бы Золушка была убийцей и приехала на бал не танцевать с принцем, а убить его? Позже эти девичьи фантазии нашли отражение в эпическом фэнтези «Стеклянный трон»."
                    }
                });
                    context.SaveChanges();
                }

                if (!context.TypeGenre.Any())
                {
                    context.TypeGenre.AddRange(new List<TypeGenre>()
                {
                    new TypeGenre ()
                    {
                        Name = "Художественная литература",
                        Description = "В этом разделе вы сможете выбрать и заказать лучшие романы о любви, книги современных авторов, историко-приключенческие романы, детективы, фантастику и триллеры, произведения зарубежных и отечественных классиков."
                    },
                    new TypeGenre ()
                    {
                        Name = "Прикладная литература",
                        Description = "В этом разделе представлены: сборники советов, справочная литература, энциклопедии, словари. Книги содержат полезные советы от профессионалов и практиков на различные темы: здоровье, красота и стиль, кулинария, рукоделие, строительство и ремонт, психология, история, компьютерная литература."
                    }
                });
                    context.SaveChanges();
                }

                if (!context.Genre.Any())
                {
                    context.Genre.AddRange(new List<Genre>()
                {
                    new Genre ()
                    {
                        Name = "Фэнтези",
                        Fk_TypeGenreId = 1
                    },
                    new Genre ()
                    {
                        Name = "Научная фантастика",
                        Fk_TypeGenreId = 2
                    },
                    new Genre()
                    {
                        Name = "Приключения",
                        Fk_TypeGenreId = 1
                    },
                    new Genre()
                    {
                        Name = "Роман",
                        Fk_TypeGenreId = 1
                    },
                    new Genre()
                    {
                        Name = "ЛитРПГ",
                        Fk_TypeGenreId = 1
                    },
                    new Genre()
                    {
                        Name = "Боевики. Остросюжтная литература",
                        Fk_TypeGenreId = 1
                    },
                    new Genre()
                    {
                        Name = "Кулинария",
                        Fk_TypeGenreId = 2
                    },
                    new Genre()
                    {
                        Name = "Психология",
                        Fk_TypeGenreId = 2
                    },
                    new Genre()
                    {
                        Name = "Бизнес и саморазвитие",
                        Fk_TypeGenreId =2
                    }
                });
                    context.SaveChanges();
                }


                if (!context.Book.Any())
                {
                    context.Book.AddRange(new List<Book>()
                    {
                        new Book ()
                        {
                            Title = "Ведьмак. Кровь эльфов",
                            Pages = 320,
                            Format = "135х205",
                            LongDescription="Маленькая Цири - дитя-неожиданность - стала большей неожиданностью, чем казалось сначала. Ужасные сны о гибели Цинтры разрушают ее душу, а рождающийся колдовской дар может разрушить тело.Совладать с ним только могучей волшебнице Йеннефер.Поэтому Геральту не удается долго прятать Цири в Ведьмачском поселке.",
                            ShortDescription = "Продолжение саги о Ведьмаке",
                            Amount = 50,
                            Price = 240,
                            ImageUrl = "/img/TheWitcher_ElfBlood.jpg",
                            IsFavor = true,
                            ResealeDate =  new DateTime(2015, 12, 31),
                            Fk_PublisherId = 2
                        },
                        new Book()
                        {
                            Title = "Стеклянный трон",
                            Pages = 380,
                            Format = "130х205",
                            LongDescription="С детских лет ее учили убивать. К восемнадцати она стала самой известной женщиной-ассасином во всем королевстве. И даже из мрачных каторжных подземелий, куда она была сослана, ее имя продолжает вызывать страх и трепет. Селена Сардотин. Хладнокровная преступница и очаровательная пленница, чьи сила и способности могут понадобиться ее врагам. Но сначала она должна доказать свое превосходство на турнире в стеклянном замке. Это единственный путь к свободе в стране, где по приказу короля уничтожены древние знания и жестоко карается даже простое упоминание о магии. Но магию не вытравить по принуждению, она способна проявляться неожиданно. Как и любовь.",
                            ShortDescription = "Начало приключений известной женщины-ассасина.",
                            Amount = 20,
                            Price = 180,
                            ImageUrl = "/img/stekljannyj-tron.jpg",
                            IsFavor = true,
                            ResealeDate =  new DateTime(2020, 12, 31),
                            Fk_PublisherId = 1
                        },
                        new Book()
                        {
                            Title = "Властелин Колец. Две крепости",
                            Pages = 430,
                            Format = "115x180",
                            LongDescription = "Тьма сгущается над членами распавшегося Братства Кольца. Их судьбы по разному складываются в эпоху противостояния двух башен Белой и Черной - Минас-Тирита и Минас Моргула. Хоббит Фродо из-за предательства слабодушного Голума попадает в подземелье ужасной паучихи Шелоб. Его слуга, Сэм, уверенный в гибели хозяина, после долгих сомнений берет на себя нелегкую миссию Хранителя Кольца... Снятый по книге фильм Две Крепости - продолжение Властелина Колец: Братство Кольца. В мире кино произвел не меньший эффект, чем его первая часть, получившая четыре Оскара. Над этим чудом компьютерной графики трудились 26 тысяч человек, а актеры Лив Тайлер, Бернард Хилл, Орландо Блум, Миранда Отто и Вигго Мортенсен, создали поистине сказочные и незабываемые образы другой реальности.",
                            ShortDescription = "Тьма сгущается над братством.",
                            Amount = 100,
                            Price = 300,
                            ImageUrl = "/img/Lotr2Custels.jpg",
                            IsFavor = false,
                            ResealeDate =  new DateTime(20, 12, 31),
                            Fk_PublisherId = 3
                        },
                        new Book()
                        {
                            Title = "Лунь",
                            Pages = 320,
                            Format = "135х205",
                            LongDescription="Зона изменилась. Катастрофический Выброс две тысячи седьмого года далеко отодвинул ее прежние границы. Интерес ученых к Зоне возрастает, хотя уцелеть среди новых аномалий и неизвестных мутантов теперь не просто трудная задача, а целое искусство.",
                            ShortDescription = "Первая книга в цикле о Луне",
                            Amount = 40,
                            Price = 180,
                            ImageUrl = "/img/Lun.jpg",
                            IsFavor = true,
                            ResealeDate =  new DateTime(20, 9, 21),
                            Fk_PublisherId = 4
                        },
                        new Book()
                        {
                            Title = "Меня зовут Лис",
                            Pages = 384,
                            Format = "210x135",
                            LongDescription = "Прикинувшись мальчишкой-солдатом, девушка Лис поступает на службу в легион Алой Розы. Ее не волнует судьба мира: было бы чем перекусить да где заснуть. Но все меняется, когда Лис находит учителя в лице сурового командира-иноземца Атоса и узнает страшную тайну, которую хранит генерал легиона – прекрасная и жуткая леди Алайла…«Меня зовут Лис» – это не просто роман, а дверь в огромный мир неведомого королевства, в котором днем бушуют войны, а в свете костра рассказывают удивительные сказки. Это история девушки, бегущей от прошлого навстречу ужасам войны. Это сага о взрослении, самосознании и простых человеческих ценностях.",
                            ShortDescription = "«Меня зовут Лис» – это не просто роман, а дверь в огромный мир неведомого королевства",
                            Amount = 132,
                            Price = 242,
                            ImageUrl = "/img/MyNameFox.jpg",
                            IsFavor = true,
                            ResealeDate =  new DateTime(10, 4, 18),
                            Fk_PublisherId = 1
                        },
                        new Book()
                        {
                            Title = "Имя для Лис",
                            Pages = 384,
                            Format = "84х108",
                            LongDescription = "История вот-вот свершится. Чтобы спасти Королевство, отважной Лис предстоит разгадать загадки таинственных посланий, сплести воедино имена и судьбы, повстречать старых друзей и врагов и не раз проверить себя на прочность. Готова ли Лис узнать правду, сколь страшной та ни была бы? Сумеет ли она сберечь свое подлинное имя и примириться с ним? Ведь самая главная битва — это битва с самим собой...",
                            ShortDescription = "История вот-вот свершится.",
                            Amount = 100,
                            Price = 200,
                            ImageUrl = "/img/NameForFox.jpg",
                            IsFavor = false,
                            ResealeDate =  new DateTime(10, 4, 18),
                            Fk_PublisherId = 4
                        },
                        new Book()
                        {
                            Title = "Самый богатый человек в Вавилоне",
                            Pages = 120,
                            Format = "145x205",
                            LongDescription = "«Самый богатый человек в Вавилоне» стал классикой литературы про экономике, управлению финансами и одновременно по саморазвитию.",
                            ShortDescription = "Чтобы исполнить все свои замыслы и желания, современный человек прежде всего должен добиться успеха в денежных вопросах, используя принципы управления личными финансами, изложенные на страницах этой книги в доступной и увлекательной форме. Джордж Сэмюэл Клейсон публиковал очерки об экономии и финансовом успехе, используя форму историй и притч Древнего Вавилона. Эти произведения получили широкое распространение в банках и страховых компаниях. Их прочти миллионы людей. ",
                            Amount = 99,
                            Price = 160,
                            ImageUrl = "/img/reachesManInVavilon.jpg",
                            IsFavor = false,
                            ResealeDate =  new DateTime(10, 4, 18),
                            Fk_PublisherId = 3
                        }
                    });

                    context.SaveChanges();
                }

                if (!context.Book_Genre.Any())
                {
                    context.Book_Genre.AddRange(new List<Book_Genre>()
                {
                    new Book_Genre()
                    {
                        Fk_GenreId = 1,
                        Fk_BookId = 1
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 3,
                        Fk_BookId = 1
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 1,
                        Fk_BookId = 2
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 4,
                        Fk_BookId = 2
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 1,
                        Fk_BookId = 3
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 3,
                        Fk_BookId = 3
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 2,
                        Fk_BookId = 4
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 1,
                        Fk_BookId = 5
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 3,
                        Fk_BookId = 5
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 1,
                        Fk_BookId = 6
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 3,
                        Fk_BookId = 6
                    },
                    new Book_Genre()
                    {
                        Fk_GenreId = 9,
                        Fk_BookId = 7
                    }

                });
                    context.SaveChanges();
                }

                if (!context.Book_Author.Any())
                {
                    context.Book_Author.AddRange(new List<Book_Author>()
                {
                    new Book_Author()
                    {
                        Fk_AuthorId = 1,
                        Fk_BookId = 1
                    },
                    new Book_Author()
                    {
                        Fk_AuthorId = 6,
                        Fk_BookId = 2
                    },
                    new Book_Author()
                    {
                        Fk_AuthorId = 3,
                        Fk_BookId = 3
                    },
                    new Book_Author()
                    {
                        Fk_AuthorId = 2,
                        Fk_BookId = 4
                    },
                    new Book_Author()
                    {
                        Fk_AuthorId = 4,
                        Fk_BookId = 5
                    },
                    new Book_Author()
                    {
                        Fk_AuthorId = 4,
                        Fk_BookId = 6
                    },
                    new Book_Author()
                    {
                        Fk_AuthorId = 5,
                        Fk_BookId = 7
                    }
                });
                    context.SaveChanges();
                }
            }
        }
    }
}

