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

    <title>Paws to Care | Owners</title>
  </head>
  <body>
    <!-- Navigation bar -->
    <?php include('navbarAdmin.php'); ?>

    <div class="container">
        <!-- content here -->
        <h2 class="text-center">Owners</h2>
        <table class="table">
            <thead>
                <?php
                    updateTableHeader();
                ?>
            </thead>
            <tbody id="dogTable">
                <!--TODO: Replace with actual data via javascript -->
                <?php
                    updateTableBody();
                ?>
            </tbody>
        </table>
        <?php
            updatePagination();
        ?>

        <hr>

        <footer>
            <p>&copy; Paws to Care 2018</p>
        </footer>
    </div>

    <?php include("modals.php"); ?>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
  </body>
</html>

<?php
function updateTableHeader() {

}

function updateTableBody() {

}

function updatePagination() {
    
}
?>