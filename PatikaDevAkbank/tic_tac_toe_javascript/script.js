/*

Değişkenler: ->
  - Tüm HTMl elementlerini seç
  - Boş oyun tahtası oluştur (9 boş hücre) board=["","","","","","","","",""]
  - Oyunun aktif olup olmadığını belirten bir boolean oluştur (gameActive = true)
  - 3x3 oyun için Kazanma koşullarını (winningConditions) bir array içinde belirle.   
  - Hücrelere click eventlerini ekle (handleCellClick)
  - Restart butonuna click eventi ekle (handleRestartGame)
  - Oyuncu seçim butonlarına tıklama eventlerini ekle, tıklandığında startGame(player) fonksiyonu çalışıp oyunu başlatsın.


-Başlat-
1 -> Oyuncu seçme ekranı göster. Oyuncu seçme butonlarına tıklandığında startGame fonksiyonuna oyuncuyu parametre olarak gönderir.
{

Fonksiyon: startGame(player) -> tıklanan oyuncuyla oyunu başlat
  - Mevcut oyuncuyu (currentPlayer) parametrede verilen oyuncu olarak ayarla
  - Oyuncu seçim ekranını domdan gizle
  - Oyun tahtasını ve oyuncu sırası ekranını göster
  - Oyuncu sırasını güncelle
  - Yeniden oyna butonunu göster

}
2 -> Oyun: Hücrelere eklenen HandleCellClick eventi ile, hücreye tıklandığında HandleCellClick eventini çağır: 
          
{
Fonksiyon: handleCellClick(e) ->
- Tıklanan hücreyi ve indexini event'ten al
- Validation --> Eğer hücre doluysa veya oyun aktif değilse (sonuçlanmışsa) boş return et.  
- Değilse HandleCellPlayed fonksiyonuna tıklanan hücre ve endeksini parametre olarak gönder
 
}

Fonksiyon: handleCellPlayed(clickedCell, clickedCellIndex)  ->
  - Board'daki ilgili hücreye kullanıcının kodunu gir (X veya O, currentPlayer) (board[clickedCellIndex] = currentPlayer)
  - Tıklanan hücreyi oyuncu koduyla güncelle (clickedCell.innerHTML = currentPlayer)
  - Tıklama sonrası kazanan var mı diye kontrol et. (handleResultValidation)
  - Oyuncu değiştirme fonksiyonunu çağır. (HandlePlayerChange)

Fonksiyon: handleResultValidation() -> Kazanan var mı kontrolü.
  - roundWon default ayarla (roundWon = false)
    { 
    - winningconditions arrayini for döngüsüyle dön. board[winningConditions[i][0]], board[winningConditions[i][2]] X'e eşitse ve board[winningConditions[i][1]] O'ya eşitse o zaman oyunun kazananı var demek.
    - Validation-> Eğer bir kazanan varsa:
      - Oyunu durdur (gameActive = false)
      - Yeniden başlatmak ister misiniz yazdır ve kazananı ilan et (alert)
      - oyuncuyu değiştirmeden return et
      }
  - Validation-> Eğer tüm hücreler doluysa ve kazanan yoksa:
    - Oyunu durdur (gameActive = false)
    - Beraberliği ilan et (alert) ve yeniden başlatmak ister misiniz yazdır
    - oyuncuyu değiştirmeden return et
  
  - Tüm validationlardan geçildi, Oyuncuyu değiştir (handlePlayerChange) -> oyun hala bitmedi, oyuncuyu değiştir.


Fonksiyon: handlePlayerChange() -> kullanıcı değiştirme

  - Mevcut oyuncuyu değiştir (currentPlayer = currentPlayer === "X" ? "O" : "X")
  - DOM'da oyuncu sırası kutusunu güncelle


3- Oyun berabere veya bir kazananla bitti. Restart button Click event:

Fonksiyon: handleRestartGame()
  - Tahtayı sıfırla 
  - Oyunu aktif hale getir (gameActive = true)
  - Tüm hücreleri döngüyle temizle (cells.forEach)
  - Oyun tahtasını ve restart butonunu gizle
  - Oyuncu seçim ekranını göster

*/
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restartButton");
const playerChoice = document.getElementById("playerChoice");
const chooseXButton = document.getElementById("chooseX");
const chooseOButton = document.getElementById("chooseO");
const boardElement = document.querySelector(".board");
const playerTurnElement = document.getElementById("playerTurn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", handleRestartGame);
chooseXButton.addEventListener("click", () => startGame("X"));
chooseOButton.addEventListener("click", () => startGame("O"));

function startGame(player) {
  currentPlayer = player;
  playerChoice.style.display = "none";
  boardElement.style.display = "grid";
  playerTurnElement.style.display = "block";
  restartButton.style.display = "block";
  playerTurnElement.innerHTML = `Sıra ${currentPlayer} oyuncusunda.`;
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  board[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  handleResultValidation();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerTurnElement.innerHTML = `Sıra ${currentPlayer} oyuncusunda.`;
}

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
}
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === "X" && b === "O" && c == "X") {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    playerTurnElement.innerHTML = "Yeniden oynamak için butona tıklayın:";
    alert(`Oyunu Kazandınız! Tebrikler ${currentPlayer}!`);
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    playerTurnElement.innerHTML = "Yeniden oynamak için butona tıklayın:";
    gameActive = false;
    alert("oyun berabere !");
    return;
  }
  handlePlayerChange();
}

function handleRestartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  cells.forEach((cell) => (cell.innerHTML = ""));
  boardElement.style.display = "none";
  restartButton.style.display = "none";
  playerChoice.style.display = "block";
  playerTurnElement.style.display = "none";
}
