<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CategoryRepository")
 */
class Category
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Project", mappedBy="category")
     */
    private $projects;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Category
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set projects
     *
     * @param ArrayCollection $projects
     * @return Category
     */
    public function setProjects(ArrayCollection $projects)
    {
        $this->projects = $projects;

        return $this;
    }

    /**
     * Get projects
     *
     * @return ArrayCollection
     */
    public function getProjects()
    {
        return $this->projects;
    }

    /**
     * Add projects
     *
     * @param Project $project
     * @return Category
     */
    public function addProject(Project $project)
    {
        $this->projects[] = $project;

        return $this;
    }

    /**
     * Remove projects
     *
     * @param Project $project
     */
    public function removeProject(Project $project)
    {
        $this->projects->removeElement($project);
    }
}
