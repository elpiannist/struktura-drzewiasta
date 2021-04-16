@extends('layouts.app')
<script>var data = {!! $data !!};</script>
@section('content')

    <button class="button btn" onClick="$('#tree').treeview('collapseAll');">Zwiń</button>
    <button class="button btn" onClick="$('#tree').treeview('expandAll');">Rozwiń</button>
    @auth
    @if($is_admin == true)
        <button class="button btn" onClick="add()">Dodaj</button>
        <button class="button btn" onClick="remove()">Usuń</button>
        <button class="button btn" onClick="edit()">Edytuj</button>
        <input type="text" id="addtext" name="addtext" placeholder="nazwa gałęzi">
        <button class="button btn-primary" onClick="send()">Zaktualizuj</button>
    @endif
    @endauth
    <div id="tree"></div>

@endsection
