
<?php
session_start();
if(session_destroy())
{
	?><script>
		localStorage.setItem('user','');
		window.location.href = "http://34.215.40.163/index.php";
	</script><?php
	
}
?>