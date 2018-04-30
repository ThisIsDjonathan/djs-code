<?php namespace App\Http\Controllers;

//Import da classe DB
Use Illuminate\Support\Facades\DB;
/**
* 
*/
class ProdutoController extends Controller
{
	public function lista()
	{
		$produtos = DB::select('select * from produtos');
		dd($produtos);

		return "<h1> Lista de Produtos </h1>";
	}	
}