<?php 
function list_image_sizes(){
  $sizes = get_intermediate_image_sizes();
  //$sizes = wp_get_registered_image_subsizes();
  echo '<pre><ul>';
  foreach ( $sizes as $key => $size){
    //echo '<li>' . $key . ': ' . $size['width'] . ' ' . $size['height'] . '</li>';
    echo '<li>' . $key . ': ' . $size . '</li>';
  }
  echo '</ul></pre>';
}

add_action( 'wp_body_open', 'list_image_sizes' );