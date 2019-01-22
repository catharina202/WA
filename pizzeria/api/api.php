<?php
/*

MySQL database connection
*/
$dbhost='localhost';
$dbname='pizzeria';
$dbuser='kucharz';
$dbpswd='hasloDoPizzerii';

// new PDO(link do bazy, użytkownik, hasło, parametry)
$dbSQL = new PDO('mysql:host='.$dbhost.';dbname='.$dbname.';charset=utf8', $dbuser, $dbpswd, array(  
		PDO::ATTR_EMULATE_PREPARES => false,  
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
		)  
	);


// odebranie danych POST
$postdata = file_get_contents("php://input");

// Zamiana JSON(string) na tablicę 
$data = json_decode($postdata, true);

$data['request']=$_POST['request'];
$data['id']=$_POST['id'];
$data['name']=$_POST['name'];
$data['ingredients']=$_POST['ingredients'];
$data['price']=$_POST['price'];
$data['orderId']=$_POST['orderId'];
$data['tableId']=$_POST['tableId'];
$data['totalCost']=$_POST['totalCost'];
$data['selectedPizza']=$_POST['selectedPizza'];
$data['isActive']=$_POST['isActive'];

if($data['request']=='getPizza'){


	$sql="SELECT * FROM Pizza";
	$res = $dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);
	$Pizza=array();
	foreach ($res as $value) {
		$Pizza[]=array(
			'id'=>$value['PizzaID'],
			'name'=>$value['Name'],
			'ingredients'=>$value['Ingredients'],
			'price'=>$value['Price']
		);
	}

	echo json_encode($Pizza);
}

if($data['request']=='getTables'){

	$sql="SELECT * FROM Tables";
	$res = $dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);
	$Tables=array();
	foreach ($res as $value) {
		$Tables[]=array(
			'id'=>$value['TablesID'],
			'name'=>$value['Name'],
			'seats'=>$value['Seats'],
			'isState'=>$value['IsState']
		);
	}

	echo json_encode($Tables);
}

if($data['request']=='getOrders'){

	$sql="SELECT * FROM Orders";
	$res = $dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);
	$Tables=array();
	foreach ($res as $value) {
		$Tables[]=array(
			'id'=>$value['OrdersID'],			
			'table'=>$value['TablesID'],
			'totalCost'=>$value['TotalCost'],
			'selectedPizza'=>$value['SelectedPizza'],
			'isActive'=>$value['IsActive']
		);
	}

	echo json_encode($Tables);
}


if($data['request']=='search'){

	$search=$data['search'];
	$sql="SELECT * FROM utwory WHERE name LIKE '%$search%'";
	$res = $dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC);
	$utwor=array(
		'id'=>$res['id'],
		'name'=>$res['name'],
		'time'=>$res['dtime']
	);

	echo json_encode($utwor);
}
if($data['request']=='addPizza'){
	$name=$data['name'];
	$ingredients=$data['ingredients'];
	$price=$data['price'];

 	$sql="INSERT INTO Pizza (Name, Ingredients, Price) 
 		VALUES (:name, :ingredients, :price)";

	$stmt=$dbSQL->prepare($sql);
	$stmt->bindValue(":name", $name);
	$stmt->bindValue(":ingredients", $ingredients);
	$stmt->bindValue(":price", $price);
	if($stmt->execute()){
		echo json_encode(array('message'=>'success'));
	}else{
		echo json_encode(array('message'=>'error'));
	}
}

if($data['request']=='addOrder'){
	$tableId=$data['tableId'];
	$totalCost=$data['totalCost'];
	$selectedPizza=$data['selectedPizza'];
	$isActive=$data['isActive'];

 	$sql="INSERT INTO Orders (TablesID, TotalCost, SelectedPizza, IsActive) 
 		VALUES (:tableId, :totalCost, :selectedPizza, :isActive)";

	$stmt=$dbSQL->prepare($sql);
	$stmt->bindValue(":tableId", $tableId);
	$stmt->bindValue(":totalCost", $totalCost);
	$stmt->bindValue(":selectedPizza", $selectedPizza);
	$stmt->bindValue(":isActive", $isActive);
	if($stmt->execute()){
		echo json_encode(array('message'=>'success'));
	}else{
		echo json_encode(array('message'=>'error'));
	}

	// Zmiana stanu stolika
	$isState=1;
	$sql="UPDATE Tables SET IsState='$isState' WHERE TablesID=$tableId;";
	if($dbSQL->query($sql)->execute()){
		echo json_encode(array('message'=>'success'));
	}else{
		echo json_encode(array('message'=>'error'));
	}
}

if($data['request']=='endOrder'){
	$orderId=$data['orderId'];
	$tableId=$data['tableId'];
	$isActive=0;
	$isState=0;

	$sql="UPDATE Orders SET IsActive='$isActive' WHERE OrdersID=$orderId";
	if($dbSQL->query($sql)->execute()){
		echo json_encode(array('message'=>'success'));
	}else{
		echo json_encode(array('message'=>'error'));
	}

	$sql="UPDATE Tables SET IsState='$isState' WHERE TablesID=$tableId;";
	if($dbSQL->query($sql)->execute()){
		echo json_encode(array('message'=>'success'));
	}else{
		echo json_encode(array('message'=>'error'));
	}
}
if($data['request']=='deletePizza'){
	$id=$data['id'];

	$sql="DELETE FROM Pizza WHERE PizzaId=$id";

	if($dbSQL->query($sql)->execute()){
		echo json_encode(array('message'=>'success'));
	}else{
		echo json_encode(array('message'=>'error'));
	}
}
?>