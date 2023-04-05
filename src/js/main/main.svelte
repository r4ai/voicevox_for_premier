<script lang="ts">
  let selectedValue = "";
</script>

<main data-theme="business">
  <form class="form-control w-full max-w-xs flex gap-4">
    <div>
      <label class="label" for="character-select">
        <span class="label-text">Select Character</span>
      </label>
      <select class="select select-bordered select-sm" id="character-select">
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>
    </div>
    <div class="w-full text-center">
      <input type="submit" class="btn btn-sm btn-primary" value="Generate" />
    </div>
  </form>
</main>

<style>
</style>
