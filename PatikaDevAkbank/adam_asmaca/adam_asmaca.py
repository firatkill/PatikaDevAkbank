import random

# Algoritma:
# 1. Kelime listesi tanımla.
# 2. Kullanıcıya hoş geldiniz mesajı göster ve çıkmak için 'exit' komutunu bildir.
# 3. Sonsuz bir döngü başlat:
# {
#    1. Kelime listesinden rastgele bir kelime seç.
#    2. Seçilen kelimenin uzunluğunu al.
#    3. Kelimenin uzunluğu kadar "_" içeren bir liste oluştur. Eğer kelime boşluk içeriyorsa, boşlukları " " olarak bırak.
#    4. Deneme hakkını 5 olarak ayarla.
#    5. Kullanılan harfleri tutmak için boş bir liste oluştur.
#    6. Yeni kelime tahmini için kullanıcıyı bilgilendir.
#    7. Deneme hakkı bitene veya kelime doğru tahmin edilene kadar döngüye gir:
#      {
#       1. Kullanıcıdan bir harf tahmin etmesini iste.
#       2. Kullanıcı "exit" girerse oyunu sonlandır.
#       3. Tahmin edilen harf daha önce kullanılmışsa kullanıcıyı uyar ve tekrar tahmin iste.
#       4. Tahmin edilen harfi kullanılan harfler listesine ekle.
#       5. Tahmin edilen harf kelimede varsa:
#          - Kelimede doğru tahmin edilen harfin pozisyonlarını güncelle.
#          - Kullanıcıya doğru tahmin yaptığını bildir.
#       6. Tahmin edilen harf kelimede yoksa:
#          - Deneme hakkını bir azalt.
#          - Kullanıcıya yanlış tahmin yaptığını ve kalan deneme hakkını bildir.
#       7. Güncel kelimeyi kullanıcıya göster.
#      }
#    8. Eğer kelime doğru tahmin edilirse kullanıcıyı tebrik et ve yeniden oynamak isteyip istemediğini sor.
#    9. Eğer deneme hakkı biterse kullanıcıya doğru kelimeyi bildir ve yeniden oynamak isteyip istemediğini sor.
#    10. Eğer kullanıcı "yes" derse yeni bir kelime ile oyunu yeniden başlat.
#    11. Eğer kullanıcı "no" derse oyunu sonlandır.
# }

def adam_asmaca():
    words = ["patika", "akbank", "yapay zeka", "veri bilimi", "bootcamp"]
    print("*" * 50)
    print("Adam Asmaca Oyununa Hoş Geldiniz!")
    print("*" * 50)
    print("\n!!! Oyunu bitirmek için 'exit' yazabilirsiniz.")

    while True:
        chosenWord = random.choice(words)
        wordLength = len(chosenWord)
        display_word = ["_" if letter != " " else " " for letter in chosenWord]
        attemptsLeft = 5
        lettersGuessed = []

        print("\nYeni bir kelime tahmin etmeye başlayın!")
        print("Toplamda 5 deneme hakkınız var.")
        print("Kelime:", " ".join(display_word))

        while attemptsLeft > 0 and "_" in display_word:
            guessedLetter = input("Bir harf tahmin edin: ").lower()
            
            if guessedLetter == "exit":
                print("Oyun sonlandırıldı. Hoşçakalın!")
                return

            if guessedLetter in lettersGuessed:
                print("Bu harfi zaten kullandınız. Başka bir harf deneyin.")
                continue

            lettersGuessed.append(guessedLetter)

            if guessedLetter in chosenWord:
                for i in range(wordLength):
                    if chosenWord[i] == guessedLetter:
                        display_word[i] = guessedLetter
                print("Doğru tahmin!")
            else:
                attemptsLeft -= 1
                print("Yanlış tahmin! Kalan deneme hakkınız:", attemptsLeft)

            print("Kelime:", " ".join(display_word))

        if "_" not in display_word:
            print("Tebrikler! Kelimeyi doğru tahmin ettiniz:", chosenWord)
        else:
            print("\nMaalesef kaybettiniz, Adamı kurtaramadınız!\nDoğru kelime:", chosenWord)

        replay = input("Yeniden oynamak ister misiniz? (type yes to restart): ").lower()
        if replay != "yes":
            print("Oyun sonlandırıldı. Hoşçakalın!")
            break
       
        

adam_asmaca()
