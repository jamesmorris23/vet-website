<!doctype html>
<html lang="en">
  <!-- Homepage content -->
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/style.css">

    <title>Paws to Care | Dogs</title>
  </head>
  <body>
    <!-- Navigation bar -->
    <?php include('navbarAdmin.php'); ?>

    <div class="container">
        <!-- content here -->
        <h2 class="text-center">Dogs</h2>
        <table class="table">
            <thead>
                <tr>
                <!-- /* $("#nameHeader").click(nameSort);
                $("#speciesHeader").click(speciesSort);
                $("#sexHeader").click(sexSort);
                $("#ageHeader").click(ageSort);
                $("#ownerHeader").click(ownerSort);
                $("#noteHeader").click(noteSort); */ -->
                    <th scope="col" id="nameHeader" title="The name of the animal given by the owner"><input id="nameFilter" class="form-control form-control-sm" type="text" placeholder="Filter"> <br> <span class="clickable" onclick="nameSort()"> Name </span></th>
                    <th scope="col" class="clickable" id="speciesHeader" title="The breed of the animal specified by the owner (verified on first visit)."><input id="breedFilter" class="form-control form-control-sm" type="text" placeholder="Filter"> <br> <span onclick="speciesSort()"> Breed</span></th>
                    <th scope="col" class="clickable" id="sexHeader" title="The sex of the animal (verified on first visit)."><span onclick="sexSort()">Sex</span></th>
                    <th scope="col" title="Indicates whether or not the animal is up to date on shots.">Shots</th>
                    <th scope="col" class="clickable" id="ageHeader" title="The age indicated by the animal's owner. If unknown, a best guess is given."><span onclick="ageSort()">Age</span></th>
                    <th scope="col" title="The size of the animal. Small &lt; 20 lbs, Medium &lt; 50 lbs, Large &lt; 100 lbs, Giant &gt; 100lbs">Size</th>
                    <th scope="col" title="Indicates whether the animal was licensed by either our clinic or the city.">Licensed</th>
                    <th scope="col" title="Indicates whether or not the animal has been spayed/neutered.">Neutered</th>
                    <th scope="col" id="ownerHeader" title="Indicates the name of the owner(s) as specified on the animals intake sheet.">Owner(s)</th>
                    <th scope="col" id="noteHeader" title="Any notes we have left while the animal has been seen in our practice."><br> Notes</th>
                </tr>
            </thead>
            <tbody id="dogTable">
                <!--TODO: Replace with actual data via javascript -->
                <tr>
                    <th>Loading...</th>
                </tr>
            </tbody>
        </table>
        <ul id="pagination-widget" class="pagination-med justify-content-center"></ul>

        <hr>

        <footer>
            <p>&copy; Paws to Care 2018</p>
        </footer>
    </div>

    <?php include("modals.php"); ?>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
    <script src="../js/dogs.js"></script>
    <script src="../js/jquery.twbsPagination.min.js"></script>
  </body>
</html>